import { NextRequest, NextResponse } from 'next/server';

// ============================================================
// POST /api/b2/calculate-score
// telc B2 Beruf resmi puanlama algoritması: 240 puan sistemi
// ============================================================

interface ModuleScore {
  lesen: number;    // max 60
  hoeren: number;   // max 60
  schreiben: number; // max 60
  sprechen: number;  // max 60
}

interface ScoreResult {
  moduleScores: ModuleScore;
  totalScore: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  failReason?: string;
  moduleStatus: {
    lesen: 'passed' | 'failed' | 'pending';
    hoeren: 'passed' | 'failed' | 'pending';
    schreiben: 'passed' | 'failed' | 'pending';
    sprechen: 'passed' | 'failed' | 'pending';
  };
  grade: 'sehr gut' | 'gut' | 'befriedigend' | 'ausreichend' | 'nicht bestanden';
  nextSteps: string[];
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { lesen = 0, hoeren = 0, schreiben = 0, sprechen = 0 } = body as Partial<ModuleScore>;

  const moduleScores: ModuleScore = { lesen, hoeren, schreiben, sprechen };
  const totalScore = lesen + hoeren + schreiben + sprechen;
  const maxScore = 240;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // telc B2 Beruf kuralı: Her modülden min 36, toplam min 144
  const MIN_MODULE = 36;
  const MIN_TOTAL = 144;

  const failedModules: string[] = [];
  if (lesen < MIN_MODULE) failedModules.push('Lesen');
  if (hoeren < MIN_MODULE) failedModules.push('Hören');
  if (schreiben < MIN_MODULE) failedModules.push('Schreiben');
  if (sprechen < MIN_MODULE) failedModules.push('Sprechen');

  const passed = totalScore >= MIN_TOTAL && failedModules.length === 0;

  let failReason: string | undefined;
  if (!passed) {
    if (totalScore < MIN_TOTAL && failedModules.length > 0) {
      failReason = `Gesamtpunktzahl zu niedrig (${totalScore}/${MIN_TOTAL}) und Mindestpunktzahl in ${failedModules.join(', ')} nicht erreicht`;
    } else if (totalScore < MIN_TOTAL) {
      failReason = `Gesamtpunktzahl zu niedrig: ${totalScore} Punkte (Mindest: ${MIN_TOTAL})`;
    } else {
      failReason = `Mindestpunktzahl (36) nicht erreicht in: ${failedModules.join(', ')}`;
    }
  }

  // Not hesabı
  let grade: ScoreResult['grade'];
  if (!passed) {
    grade = 'nicht bestanden';
  } else if (percentage >= 90) {
    grade = 'sehr gut';
  } else if (percentage >= 75) {
    grade = 'gut';
  } else if (percentage >= 60) {
    grade = 'befriedigend';
  } else {
    grade = 'ausreichend';
  }

  // Öneri üretimi
  const nextSteps: string[] = [];
  if (!passed) {
    failedModules.forEach(m => {
      const tips: Record<string, string> = {
        'Lesen': '📖 Lesen: Täglich Fachtexte auf B2-Niveau lesen. Auf Signalwörter achten.',
        'Hören': '🎧 Hören: Deutschlandfunk Podcasts, telc Übungsmaterialien mit MP3.',
        'Schreiben': '✍️ Schreiben: Beschwerdebriefe und Forumsbeiträge üben. Struktur beachten.',
        'Sprechen': '🗣️ Sprechen: Täglich 3 Minuten zu einem Thema sprechen (aufnehmen und anhören).',
      };
      if (tips[m]) nextSteps.push(tips[m]);
    });
  } else {
    nextSteps.push('🎉 Herzlichen Glückwunsch! Du hast die Prüfung bestanden.');
    if (percentage < 75) {
      nextSteps.push('💪 Für ein besseres Ergebnis: Weiter üben um das Niveau zu festigen.');
    }
  }

  const result: ScoreResult = {
    moduleScores,
    totalScore,
    maxScore,
    percentage,
    passed,
    failReason,
    moduleStatus: {
      lesen: lesen >= MIN_MODULE ? 'passed' : 'failed',
      hoeren: hoeren >= MIN_MODULE ? 'passed' : 'failed',
      schreiben: schreiben >= MIN_MODULE ? 'passed' : 'failed',
      sprechen: sprechen >= MIN_MODULE ? 'passed' : 'failed',
    },
    grade,
    nextSteps,
  };

  return NextResponse.json(result);
}
