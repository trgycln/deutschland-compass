
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  author: string;
  tags: string[];
  image_url?: string;
};

async function getBlogPost(slug: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !data) {
    return null;
  }
  return data as BlogPost;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-2 transition-all">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Tüm Yazılara Dön
        </Link>
      </Button>

      <div className="space-y-6 mb-12">
        <div className="flex gap-2 flex-wrap">
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between border-b pb-8">
          <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" /> 
              {new Date(post.created_at).toLocaleDateString('tr-TR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          <Button variant="outline" size="icon">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {post.image_url && (
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300">
          {post.content}
        </div>
      </div>
    </article>
  );
}
