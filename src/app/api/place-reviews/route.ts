import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { placeId, reviewerName, rating, comment } = body;

    if (!placeId) {
      return NextResponse.json({ error: "placeId is required" }, { status: 400 });
    }

    const numRating = Number(rating);
    if (!numRating || numRating < 1 || numRating > 5) {
      return NextResponse.json({ error: "Rating 1 ile 5 arasında olmalıdır" }, { status: 400 });
    }

    // Insert directly as verified: true
    const { data: inserted, error: insertErr } = await supabaseAdmin
      .from("place_reviews")
      .insert({
        place_id: placeId,
        reviewer_name: reviewerName?.trim() || "Anonim",
        rating: numRating,
        comment: comment?.trim() || null,
        source: "web",
        verified: true, // Direkt yayin
      })
      .select()
      .single();

    if (insertErr) {
      console.error("Review insert error:", insertErr);
      return NextResponse.json({ error: insertErr.message }, { status: 500 });
    }

    // Recalculate place rating_avg & rating_count
    const { data: allReviews } = await supabaseAdmin
      .from("place_reviews")
      .select("rating")
      .eq("place_id", placeId)
      .eq("verified", true);

    if (allReviews && allReviews.length > 0) {
      const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      await supabaseAdmin
        .from("places")
        .update({
          rating_avg: parseFloat(avg.toFixed(1)),
          rating_count: allReviews.length,
        })
        .eq("id", placeId);
    }

    return NextResponse.json({ success: true, review: inserted });
  } catch (err: any) {
    console.error("Place review API error:", err);
    return NextResponse.json({ error: err.message || "Bir hata oluştu" }, { status: 500 });
  }
}
