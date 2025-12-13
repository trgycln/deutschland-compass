import { useState } from "react";
import { ThumbsUp, ThumbsDown, Star, MessageCircle } from "lucide-react";

interface PlaceFeedbackProps {
  placeId: string | number;
}

export function PlaceFeedback({ placeId }: PlaceFeedbackProps) {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [like, setLike] = useState<null | boolean>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const handleStarClick = (value: number) => setRating(value);
  const handleLike = (val: boolean) => setLike(val);
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="mt-4 border-t pt-3">
      <div className="flex items-center gap-4 mb-2">
        {/* Like/Dislike */}
        <button
          className={`p-1 rounded-full border ${like === true ? 'bg-green-100 border-green-400' : 'border-gray-300'} hover:bg-green-50`}
          onClick={() => handleLike(true)}
          aria-label="Beğendim"
        >
          <ThumbsUp className="w-5 h-5 text-green-600" />
        </button>
        <button
          className={`p-1 rounded-full border ${like === false ? 'bg-red-100 border-red-400' : 'border-gray-300'} hover:bg-red-50`}
          onClick={() => handleLike(false)}
          aria-label="Beğenmedim"
        >
          <ThumbsDown className="w-5 h-5 text-red-600" />
        </button>
        {/* 5 Star Rating */}
        <div className="flex items-center ml-4">
          {[1,2,3,4,5].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => handleStarClick(val)}
              onMouseEnter={() => setHover(val)}
              onMouseLeave={() => setHover(0)}
              aria-label={`${val} yıldız`}
            >
              <Star className={`w-5 h-5 ${val <= (hover || rating) ? 'text-yellow-400 fill-yellow-300' : 'text-gray-300'}`} fill={val <= (hover || rating) ? '#facc15' : 'none'} />
            </button>
          ))}
        </div>
      </div>
      {/* Yorum Alanı */}
      <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 mt-2">
        <input
          type="text"
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder="Yorum yaz..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600" aria-label="Yorum gönder">
          <MessageCircle className="w-4 h-4" />
        </button>
      </form>
      {/* Yorumlar */}
      {comments.length > 0 && (
        <div className="mt-2 space-y-1">
          {comments.map((c, i) => (
            <div key={i} className="text-xs text-gray-700 bg-gray-50 rounded px-2 py-1 border border-gray-100">
              {c}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
