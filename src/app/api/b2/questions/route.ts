import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType, Schema } from '@google/generative-ai';

// ============================================================
// GET /api/b2/questions?modul=lesen&aufgabe=1
// Supabase'den soruları çeker (zaten seed edilmiş)
// ============================================================
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const modul = searchParams.get('modul');
  const aufgabe = searchParams.get('aufgabe');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  let url = `${supabaseUrl}/rest/v1/b2_questions?aktiv=eq.true&order=aufgabe.asc`;
  if (modul) url += `&modul=eq.${modul}`;
  if (aufgabe) url += `&aufgabe=eq.${aufgabe}`;

  const res = await fetch(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Sorular yüklenemedi' }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

// ============================================================
// POST /api/b2/questions/seed
// Gemini API ile PDF içeriğini yapılandırır ve Supabase'e yazar
// Bu endpoint sadece bir kez çalıştırılır (admin seed işlemi)
// ============================================================
export async function POST(request: NextRequest) {
  // Admin koruması
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  const body = await request.json();
  const { rawContent, modul, aufgabe } = body as {
    rawContent: string;
    modul: string;
    aufgabe: number;
  };

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: 'gemini-3.6-flash',
    generationConfig: {
      temperature: 0, // Kritik: Sıfır halüsinasyon
      responseMimeType: 'application/json',
      responseSchema: getSchemaForModul(modul),
    },
  });

  const prompt = buildPromptForModul(modul, aufgabe, rawContent);

  try {
    const result = await model.generateContent(prompt);
    const structured = JSON.parse(result.response.text());

    // Supabase'e yaz (service role key ile)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const insertRes = await fetch(`${supabaseUrl}/rest/v1/b2_questions`, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        modul,
        aufgabe,
        aufgabe_typ: structured.aufgabe_typ,
        inhalt: structured.inhalt,
        audio_start_sec: structured.audio_start_sec ?? null,
        audio_end_sec: structured.audio_end_sec ?? null,
        audio_transkript: structured.audio_transkript ?? null,
        thema: structured.thema,
        punkte_max: structured.punkte_max ?? 60,
        schwierigkeit: 'B2',
      }),
    });

    if (!insertRes.ok) {
      const err = await insertRes.text();
      return NextResponse.json({ error: 'Veritabanına yazılamadı', detail: err }, { status: 500 });
    }

    const saved = await insertRes.json();
    return NextResponse.json({ success: true, saved });
  } catch (e) {
    return NextResponse.json({ error: 'Gemini API hatası', detail: String(e) }, { status: 500 });
  }
}

// ============================================================
// Modüle göre JSON Schema (Structured Output için)
// ============================================================
function getSchemaForModul(modul: string): Schema {
  // Basitleştirilmiş schema (Gemini Schema API formatı)
  const baseSchema: Schema = {
    type: SchemaType.OBJECT,
    properties: {
      aufgabe_typ: { type: SchemaType.STRING },
      thema: { type: SchemaType.STRING },
      punkte_max: { type: SchemaType.NUMBER },
      inhalt: { type: SchemaType.OBJECT, properties: {} },
    },
    required: ['aufgabe_typ', 'thema', 'inhalt'],
  };
  return baseSchema;
}

// ============================================================
// Modüle göre Gemini Prompt
// ============================================================
function buildPromptForModul(modul: string, aufgabe: number, rawContent: string): string {
  const base = `Du bist ein präziser Datenstrukturierer für telc Deutsch-Test für den Beruf B2 Prüfungsunterlagen.
WICHTIG: Extrahiere den Inhalt WORTGETREU. Verändere NICHTS am Originaltext. Gib NUR das JSON-Objekt zurück, keine Erklärungen.

Rohinhalt aus der Prüfungsunterlage:
"""
${rawContent}
"""

`;

  const modulPrompts: Record<string, string> = {
    lesen: `Strukturiere diese Leseaufgabe (Aufgabe ${aufgabe}) als JSON:
{
  "aufgabe_typ": "multiple_choice" | "zuordnung" | "lueckentext",
  "thema": "<Thema des Textes>",
  "punkte_max": <Punktzahl>,
  "inhalt": {
    "anweisung": "<Aufgabenanweisung wortgetreu>",
    "text": "<Lesetext wortgetreu>",
    "fragen": [
      {
        "nummer": 1,
        "frage": "<Fragetext wortgetreu>",
        "optionen": ["a) ...", "b) ...", "c) ..."],
        "korrekt": "a",
        "erklaerung": "<Begründung aus dem Text>"
      }
    ]
  }
}`,
    hoeren: `Strukturiere diese Höraufgabe (Aufgabe ${aufgabe}) als JSON:
{
  "aufgabe_typ": "multiple_choice" | "zuordnung" | "richtig_falsch",
  "thema": "<Thema>",
  "punkte_max": <Punktzahl>,
  "audio_start_sec": <Startzeit in Sekunden>,
  "audio_end_sec": <Endzeit in Sekunden>,
  "audio_transkript": "<vollständiges Transkript wortgetreu>",
  "inhalt": {
    "anweisung": "<Aufgabenanweisung>",
    "fragen": [
      {
        "nummer": 1,
        "aussage": "<Aussage oder Frage>",
        "optionen": ["a) ...", "b) ...", "c) ..."],
        "korrekt": "a"
      }
    ]
  }
}`,
    schreiben: `Strukturiere diese Schreibaufgabe (Aufgabe ${aufgabe}) als JSON:
{
  "aufgabe_typ": "beschwerde" | "forumsbeitrag" | "email" | "bericht",
  "thema": "<Thema>",
  "punkte_max": 60,
  "inhalt": {
    "anweisung": "<vollständige Aufgabenanweisung wortgetreu>",
    "situation": "<Situationsbeschreibung>",
    "schreibanlass": "<Was soll geschrieben werden>",
    "inhaltspunkte": ["<Punkt 1>", "<Punkt 2>", "<Punkt 3>"],
    "hilfsmittel": ["<Hilfsmittel falls vorhanden>"],
    "mindestwoerter": 150,
    "bewertungskriterien": {
      "inhalt": "<Kriterien für Inhalt, max 20 Punkte>",
      "kommunikative_gestaltung": "<Kriterien, max 20 Punkte>",
      "formale_richtigkeit": "<Kriterien, max 20 Punkte>"
    }
  }
}`,
    sprechen: `Strukturiere diese Sprechaufgabe (Aufgabe ${aufgabe}) als JSON:
{
  "aufgabe_typ": "praesentation" | "gespraech" | "situation",
  "thema": "<Thema>",
  "punkte_max": 60,
  "inhalt": {
    "anweisung": "<Aufgabenanweisung wortgetreu>",
    "thema_karte": "<Text der Themenkarte wortgetreu>",
    "vorbereitungszeit_min": 15,
    "sprechzeit_min": 3,
    "leitfragen": ["<Frage 1>", "<Frage 2>", "<Frage 3>"],
    "bewertungskriterien": {
      "aufgabenerledigung": "<Kriterien>",
      "kohärenz": "<Kriterien>",
      "ausdruck": "<Kriterien>",
      "korrektheit": "<Kriterien>"
    }
  }
}`,
  };

  return base + (modulPrompts[modul] || modulPrompts.lesen);
}
