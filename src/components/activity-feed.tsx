"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { Heart, MessageSquare, Star, Users, Plus, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface Activity {
  id: string;
  activity_type: "new_place" | "new_comment" | "new_rating" | "new_checkin" | "new_image";
  place_slug: string;
  place_name: string;
  city_name: string;
  user_name: string;
  description: string;
  created_at: string;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextUpdate, setNextUpdate] = useState<number>(5);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "new_place":
        return <Plus className="w-4 h-4 text-purple-500" />;
      case "new_comment":
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case "new_rating":
        return <Star className="w-4 h-4 text-amber-500" />;
      case "new_checkin":
        return <Users className="w-4 h-4 text-green-500" />;
      case "new_image":
        return <Heart className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "new_place":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "new_comment":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "new_rating":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "new_checkin":
        return "bg-green-100 text-green-700 border-green-200";
      case "new_image":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getActivityMessage = (activity: Activity) => {
    const { activity_type, user_name, place_name, city_name, description } = activity;

    switch (activity_type) {
      case "new_place":
        return `${user_name} yeni bir mekan ekledi: ${place_name}`;
      case "new_comment":
        return `${user_name} ${place_name}'ye yorum yaptı`;
      case "new_rating":
        return `${user_name} ${place_name}'yi değerlendirdi`;
      case "new_checkin":
        return `${user_name} ${place_name}'de bulundu`;
      case "new_image":
        return `${user_name} ${place_name}'ye fotoğraf ekledi`;
      default:
        return description;
    }
  };

  // Aktiviteleri yükle
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from("activity_feed")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(15);

        // Sadece dolu error.message varsa logla
        if (error && typeof error === 'object' && 'message' in error && error.message && String(error.message).trim() !== '') {
          const errorMessage = String(error.message);
          const ignoredErrors = ['AbortError', 'aborted', 'Failed to fetch', 'NetworkError'];
          const shouldIgnore = ignoredErrors.some(err => errorMessage.includes(err));
          
          if (!shouldIgnore) {
            console.error("Aktiviteler yüklenemedi:", errorMessage);
          }
        }

        setActivities(data || []);
      } catch (err) {
        // Sadece dolu error.message varsa logla
        if (err && typeof err === 'object' && 'message' in err && err.message && String(err.message).trim() !== '') {
          const errorMessage = String(err.message);
          const ignoredErrors = ['AbortError', 'aborted', 'Failed to fetch', 'NetworkError'];
          const shouldIgnore = ignoredErrors.some(e => errorMessage.includes(e));
          
          if (!shouldIgnore) {
            console.error("Aktiviteler yüklenirken beklenmeyen hata:", errorMessage);
          }
        }
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();

    // Yenileme ölçütü (her 5 saniyede bir güncelle)
    const interval = setInterval(fetchActivities, 5000);

    return () => clearInterval(interval);
  }, []);

  // Sonraki güncelleme sayacı
  useEffect(() => {
    const interval = setInterval(() => {
      setNextUpdate((prev) => (prev > 0 ? prev - 1 : 5));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-dashed">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Yükleniyor...</div>
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-dashed">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground text-sm">
            Henüz aktivite yok. İlk aktiviteyi siz başlatın! 🚀
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-accent shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            Canlı Aktivite Akışı
          </CardTitle>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {nextUpdate}s
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 pb-3 border-b border-border/40 last:border-b-0 last:pb-0 animate-in fade-in slide-in-from-top-2 duration-500"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            {/* Icon */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${getActivityColor(activity.activity_type)}`}>
              {getActivityIcon(activity.activity_type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-snug text-foreground">
                {getActivityMessage(activity)}
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  {activity.city_name}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.created_at), {
                    addSuffix: true,
                    locale: tr,
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
