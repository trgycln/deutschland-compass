import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/gurbet-links — Tum linkleri listele
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const linkType = searchParams.get("type");
    const search   = searchParams.get("search");
    const limit    = parseInt(searchParams.get("limit") || "200");

    let query = supabase
      .from("gurbet_links")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (linkType && linkType !== "all") {
      query = query.eq("link_type", linkType);
    }
    if (search) {
      query = query.or(
        `title.ilike.%${search}%,description.ilike.%${search}%,shared_by.ilike.%${search}%`
      );
    }

    const { data, error } = await query.limit(limit);

    if (error) {
      console.error("gurbet_links query error:", error);
      // Tablo yoksa bos dondur
      if (error.code === "42P01") {
        return NextResponse.json({ links: [], count: 0, tableNotFound: true });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ links: data || [], count: (data || []).length });
  } catch (err: any) {
    console.error("gurbet-links API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}