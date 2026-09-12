"use client";

import { useState, useEffect } from "react";
import { Star, Send, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  source: string;
  created_at: string;
}

interface PlaceReviewsProps {
  placeId: string;
  placeName: string;
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 24 24" className={`w-4 h-4 ${s <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function StarSelector({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          className="cursor-pointer transition-transform hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className={`w-8 h-8 transition-colors ${s <= (hovered || value) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return "az once";
  if (diff < 3600) return `${Math.floor(diff / 60)} dakika once`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} saat once`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} gun once`;
  return new Date(dateStr).toLocaleDateString("tr-TR");
}

export default function PlaceReviews({ placeId, placeName }: PlaceReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      const { data } = await supabase
        .from("place_reviews")
        .select("id, reviewer_name, rating, comment, source, created_at")
        .eq("place_id", placeId)
        .eq("verified", true)
        .order("created_at", { ascending: false })
        .limit(20);
      setReviews((data as Review[]) ?? []);
      setLoading(false);
    }
    fetchReviews();
  }, [placeId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (rating === 0) { setError("Lütfen bir puan seçin."); return; }
    if (!comment.trim() && !name.trim()) { setError("Lütfen bir yorum veya isim girin."); return; }

    setSubmitting(true);
    try {
      const res = await fetch("/api/place-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId,
          reviewerName: name.trim() || "Anonim",
          rating,
          comment: comment.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Yorum kaydedilemedi.");
      }

      if (data.review) {
        setReviews((prev) => [data.review, ...prev]);
      }

      setSubmitted(true);
      setShowForm(false);
      setRating(0);
      setComment("");
      setName("");
    } catch (err: any) {
      setError(err.message || "Bir sorun oluştu, lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  }

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="mt-6 border-t border-gray-100 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-base">Degerlendirmeler</h3>
          {reviews.length > 0 && (
            <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
              {reviews.length}
            </span>
          )}
        </div>

        {!submitted && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <Star className="w-3.5 h-3.5" />
            Yorum Yaz
          </button>
        )}
      </div>

      {/* Summary */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4">
          <div className="text-3xl font-bold text-amber-600">{avgRating.toFixed(1)}</div>
          <div>
            <StarDisplay rating={Math.round(avgRating)} />
            <p className="text-xs text-gray-500 mt-0.5">{reviews.length} degerlendirme</p>
          </div>
        </div>
      )}

      {/* Add Review Form */}
      {showForm && !submitted && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3 border border-gray-200">
          <p className="text-xs font-semibold text-gray-700">{placeName} icin puaniniz:</p>

          <StarSelector value={rating} onChange={setRating} />

          <input
            type="text"
            placeholder="Adiniz (isteğe bagli)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
          />

          <textarea
            placeholder="Yorumunuz..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none bg-white"
          />

          {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-60 transition-colors"
            >
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Yorum Gönder
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Iptal
            </button>
          </div>
        </form>
      )}

      {/* Thank you message */}
      {submitted && (
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl p-3 mb-4 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <p className="text-xs font-semibold">Yorumunuz başarıyla yayınlandı! Değerlendirmeniz için teşekkür ederiz.</p>
        </div>
      )}

      {/* Review list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-6 text-gray-400">
          <Star className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm">Henuz degerlendirme yok.</p>
          <p className="text-xs mt-1">Ilk yorumu siz yazin!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-3.5">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <p className="font-semibold text-sm text-slate-900">{review.reviewer_name}</p>
                  <div className="flex items-center gap-2">
                    <StarDisplay rating={review.rating} />
                    {review.source === "telegram" && (
                      <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 px-1.5 py-0.5 rounded-full font-semibold">
                        Telegram
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[11px] text-gray-400 shrink-0">{timeAgo(review.created_at)}</span>
              </div>
              {review.comment && (
                <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
