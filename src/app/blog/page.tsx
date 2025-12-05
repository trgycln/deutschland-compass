
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Blog tipi tanımı
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  created_at: string;
  author: string;
  tags: string[];
  image_url?: string;
};

async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Bloglar çekilirken hata:', error);
    return [];
  }
  return data as BlogPost[];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Blog ve Makaleler</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
            Almanya'da yaşam, kariyer ve eğitim üzerine güncel rehberler, başarı hikayeleri ve ipuçları.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link href="/blog/katki">Yazı Gönder</Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed">
          <h3 className="text-xl font-medium text-slate-900 dark:text-white">Blog yazıları yakında gelecek</h3>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col h-full hover:shadow-lg transition-shadow overflow-hidden group">
              {post.image_url && (
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {post.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-slate-600 dark:text-slate-300 line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between items-center text-sm text-slate-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> 
                    {new Date(post.created_at).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
