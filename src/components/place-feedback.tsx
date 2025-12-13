"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, MessageSquare, Send, Loader2, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface PlaceFeedbackProps {
  placeName: string;
  cityName: string;
}

export function PlaceFeedback({ placeName, cityName }: PlaceFeedbackProps) {
  // Benzersiz bir ID (slug) oluşturuyoruz: örn "koln-imren-doner"
  const placeSlug = `${cityName}-${placeName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);
  
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Verileri Çek
  useEffect(() => {
    async function fetchData() {
      // 1. İstatistikleri çek
      const { data: stats } = await supabase
        .from('place_stats')
        .select('*')
        .eq('place_slug', placeSlug)
        .single();
      
      if (stats) {
        setLikes(stats.likes || 0);
        setDislikes(stats.dislikes || 0);
      } 

      // 2. Yorumları çek
      const { data: commentsData } = await supabase
        .from('place_comments')
        .select('*')
        .eq('place_slug', placeSlug)
        .order('created_at', { ascending: false });
      
      if (commentsData) setComments(commentsData);
    }
    fetchData();
  }, [placeSlug]);

  // Beğeni İşlemi
  const handleVote = async (type: "like" | "dislike") => {
    if (userVote === type) return; // Zaten oylandıysa işlem yapma

    // Arayüzü hemen güncelle (Optimistic UI)
    if (type === "like") setLikes(l => l + 1);
    else setDislikes(d => d + 1);
    
    setUserVote(type);

    // Önce kayıt var mı kontrol et, yoksa oluştur
    const { data: existingStat } = await supabase
      .from('place_stats')
      .select('place_slug')
      .eq('place_slug', placeSlug)
      .single();

    if (!existingStat) {
      // İlk kez oylanıyor, satırı oluştur
      await supabase.from('place_stats').insert([
        { 
          place_slug: placeSlug, 
          likes: type === 'like' ? 1 : 0, 
          dislikes: type === 'dislike' ? 1 : 0 
        }
      ]);
    } else {
      // Satır var, güncelle
      // Not: Gerçek uygulamada RPC (Stored Procedure) kullanmak daha güvenlidir ama şimdilik basit update yapıyoruz.
      // Bu basit yöntem eşzamanlı oylamalarda tutarsızlık yapabilir ama MVP için yeterli.
      const updateData = type === "like" ? { likes: likes + 1 } : { dislikes: dislikes + 1 };
      await supabase
        .from('place_stats')
        .update(updateData)
        .eq('place_slug', placeSlug);
    }
  };

  // Yorum Gönderme
  const handleSendComment = async () => {
    if (!newComment.trim()) return;
    setIsLoading(true);

    const commentObj = {
      place_slug: placeSlug,
      user_name: userName || "Misafir",
      comment: newComment,
    };

    const { data, error } = await supabase
      .from('place_comments')
      .insert([commentObj])
      .select()
      .single();

    if (error) {
      console.error(error);
      toast.error("Yorum gönderilemedi.");
    } else {
      setComments([data, ...comments]);
      setNewComment("");
      toast.success("Yorumunuz eklendi!");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/40">
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`h-8 px-2 gap-1.5 text-xs hover:bg-green-50 dark:hover:bg-green-900/20 ${userVote === 'like' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-muted-foreground'}`}
          onClick={() => handleVote('like')}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${userVote === 'like' ? 'fill-current' : ''}`} />
          {likes}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`h-8 px-2 gap-1.5 text-xs hover:bg-red-50 dark:hover:bg-red-900/20 ${userVote === 'dislike' ? 'text-red-600 bg-red-50 dark:bg-red-900/20' : 'text-muted-foreground'}`}
          onClick={() => handleVote('dislike')}
        >
          <ThumbsDown className={`w-3.5 h-3.5 ${userVote === 'dislike' ? 'fill-current' : ''}`} />
          {dislikes}
        </Button>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2 gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
            <MessageSquare className="w-3.5 h-3.5" />
            Yorumlar ({comments.length})
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-card">
          <SheetHeader className="border-b border-border pb-4 mb-4">
            <SheetTitle className="text-lg font-bold text-foreground">{placeName}</SheetTitle>
            <SheetDescription>
              {cityName} - Deneyim ve tavsiyeler
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-4 pb-4">
              {comments.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground text-sm flex flex-col items-center gap-2">
                  <MessageSquare className="w-8 h-8 opacity-20" />
                  Henüz yorum yapılmamış. İlk yorumu sen yap!
                </div>
              ) : (
                comments.map((comment, i) => (
                  <div key={i} className="flex gap-3 items-start bg-secondary/30 p-3 rounded-lg border border-border/50">
                    <Avatar className="w-8 h-8 border border-border shrink-0">
                      <AvatarFallback className="text-xs bg-accent/10 text-accent-foreground font-bold">
                        {(comment.user_name?.charAt(0) || 'M').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">{comment.user_name}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(comment.created_at).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          <SheetFooter className="mt-auto pt-4 border-t border-border sm:flex-col gap-3">
            <div className="space-y-3 w-full">
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="İsminiz (İsteğe bağlı)" 
                  className="h-9 text-sm pl-9"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="relative">
                <Textarea 
                  placeholder="Tecrübenizi paylaşın..." 
                  className="min-h-[80px] text-sm resize-none pr-10 bg-background"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button 
                  size="icon" 
                  className="absolute bottom-2 right-2 h-8 w-8 rounded-full"
                  onClick={handleSendComment}
                  disabled={!newComment.trim() || isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">
                Yorumlarınız topluluk kurallarına uygun olmalıdır.
              </p>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}