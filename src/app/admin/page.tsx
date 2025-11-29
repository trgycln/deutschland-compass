'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast'; // Assuming you have a toast hook, if not I'll use alert

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, Pencil, UploadCloud, Download, FileText } from 'lucide-react';

// Types
type Experience = {
  id: number;
  created_at: string;
  name: string;
  profession: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
};

type Faq = {
  id: number;
  profession_slug: string;
  question: string;
  answer: string;
  display_order: number;
};

type Document = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: string;
  uploader_name: string;
  status: 'pending' | 'approved' | 'rejected';
  profession_slug: string;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image_url?: string;
  author: string;
  is_published: boolean;
  tags: string[];
  created_at: string;
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('experiences');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  
  // Profession Selection
  const [professions, setProfessions] = useState<any[]>([]);
  const [selectedProfessionSlug, setSelectedProfessionSlug] = useState<string>('');
  const [profession, setProfession] = useState<any>(null);
  
  const [loading, setLoading] = useState(true);
  
  // Blog Edit State
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({ 
    title: '', 
    slug: '', 
    content: '', 
    excerpt: '', 
    image_url: '', 
    tags: '' 
  });

  // FAQ Edit State
  const [isFaqDialogOpen, setIsFaqDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '', profession_slug: '', display_order: 0 });

  // Document Upload State
  const [isDocDialogOpen, setIsDocDialogOpen] = useState(false);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docForm, setDocForm] = useState({ title: '', description: '', profession_slug: '' });

  useEffect(() => {
    fetchProfessions();
  }, []);

  useEffect(() => {
    if (selectedProfessionSlug) {
      fetchData();
    }
  }, [activeTab, selectedProfessionSlug]);

  async function fetchProfessions() {
    const { data, error } = await supabase
      .from('professions')
      .select('*')
      .order('title');
    
    if (data && data.length > 0) {
      setProfessions(data);
      // Set default if not set
      if (!selectedProfessionSlug) {
        setSelectedProfessionSlug(data[0].slug);
      }
    }
  }

  async function fetchData() {
    if (!selectedProfessionSlug) return;

    setLoading(true);
    try {
      if (activeTab === 'experiences') {
        // Get the profession title for the selected slug to filter experiences
        const selectedProf = professions.find(p => p.slug === selectedProfessionSlug);
        const profTitle = selectedProf ? selectedProf.title : '';

        let query = supabase
          .from('experiences')
          .select('*')
          .order('created_at', { ascending: false });
        
        // Filter by profession name if we can match it
        // Note: experiences table uses 'profession' string (e.g. "Matematik Öğretmenliği")
        if (profTitle) {
           query = query.ilike('profession', `%${profTitle}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        setExperiences(data || []);
      } else if (activeTab === 'faqs') {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .eq('profession_slug', selectedProfessionSlug)
          .order('display_order');
        if (error) throw error;
        setFaqs(data || []);
      } else if (activeTab === 'documents') {
        const { data, error } = await supabase
          .from('documents')
          .select('*')
          .eq('profession_slug', selectedProfessionSlug)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setDocuments(data || []);
      } else if (activeTab === 'blogs') {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setBlogs(data || []);
      } else if (activeTab === 'settings') {
        const { data, error } = await supabase
          .from('professions')
          .select('*')
          .eq('slug', selectedProfessionSlug)
          .single();
        
        if (error && error.code !== 'PGRST116') throw error;
        setProfession(data || { slug: selectedProfessionSlug, title: '', description: '', video_url: '' });
      }
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUploadDocument() {
    if (!docFile || !docForm.title) return;

    try {
      const fileExt = docFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${selectedProfessionSlug}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, docFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('documents')
        .insert([{
          title: docForm.title,
          description: docForm.description,
          file_url: publicUrl,
          file_type: fileExt,
          file_size: (docFile.size / 1024 / 1024).toFixed(2) + ' MB',
          uploader_name: 'Admin',
          profession_slug: selectedProfessionSlug,
          status: 'approved' // Admin uploads are auto-approved
        }]);

      if (dbError) throw dbError;

      setIsDocDialogOpen(false);
      setDocFile(null);
      setDocForm({ title: '', description: '', profession_slug: selectedProfessionSlug });
      fetchData();
      alert('Doküman yüklendi!');
    } catch (error: any) {
      console.error('Yükleme hatası:', error);
      alert('Yükleme başarısız: ' + error.message);
    }
  }

  async function updateDocumentStatus(id: number, status: 'approved' | 'rejected' | 'pending') {
    try {
      const { error } = await supabase
        .from('documents')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      setDocuments(documents.map(doc => 
        doc.id === id ? { ...doc, status } : doc
      ));
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      alert('İşlem başarısız.');
    }
  }

  async function deleteDocument(id: number) {
    if (!confirm('Bu dokümanı silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setDocuments(documents.filter(d => d.id !== id));
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Silme başarısız.');
    }
  }

  async function handleSaveFaq() {
    try {
      if (editingFaq) {
        // Update
        const { error } = await supabase
          .from('faqs')
          .update({ 
            question: faqForm.question, 
            answer: faqForm.answer,
            display_order: faqForm.display_order
          })
          .eq('id', editingFaq.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('faqs')
          .insert([{
            profession_slug: selectedProfessionSlug,
            question: faqForm.question,
            answer: faqForm.answer,
            display_order: faqForm.display_order || faqs.length + 1
          }]);
        if (error) throw error;
      }
      
      setIsFaqDialogOpen(false);
      setEditingFaq(null);
      setFaqForm({ question: '', answer: '', profession_slug: selectedProfessionSlug, display_order: 0 });
      fetchData(); // Refresh list
    } catch (error) {
      console.error('SSS kaydetme hatası:', error);
      alert('Kaydetme başarısız.');
    }
  }

  function openFaqDialog(faq?: Faq) {
    if (faq) {
      setEditingFaq(faq);
      setFaqForm({ 
        question: faq.question, 
        answer: faq.answer, 
        profession_slug: faq.profession_slug,
        display_order: faq.display_order 
      });
    } else {
      setEditingFaq(null);
      setFaqForm({ question: '', answer: '', profession_slug: selectedProfessionSlug, display_order: faqs.length + 1 });
    }
    setIsFaqDialogOpen(true);
  }

  async function handleSaveBlog() {
    try {
      const tagsArray = blogForm.tags.split(',').map(t => t.trim()).filter(t => t);
      
      if (editingBlog) {
        // Update
        const { error } = await supabase
          .from('blogs')
          .update({ 
            title: blogForm.title, 
            slug: blogForm.slug,
            content: blogForm.content,
            excerpt: blogForm.excerpt,
            image_url: blogForm.image_url,
            tags: tagsArray
          })
          .eq('id', editingBlog.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('blogs')
          .insert([{
            title: blogForm.title,
            slug: blogForm.slug || blogForm.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            content: blogForm.content,
            excerpt: blogForm.excerpt,
            image_url: blogForm.image_url,
            tags: tagsArray,
            is_published: true,
            author: 'Admin'
          }]);
        if (error) throw error;
      }
      
      setIsBlogDialogOpen(false);
      setEditingBlog(null);
      setBlogForm({ title: '', slug: '', content: '', excerpt: '', image_url: '', tags: '' });
      fetchData();
    } catch (error) {
      console.error('Blog kaydetme hatası:', error);
      alert('Kaydetme başarısız.');
    }
  }

  function openBlogDialog(blog?: BlogPost) {
    if (blog) {
      setEditingBlog(blog);
      setBlogForm({ 
        title: blog.title, 
        slug: blog.slug, 
        content: blog.content,
        excerpt: blog.excerpt,
        image_url: blog.image_url || '',
        tags: blog.tags?.join(', ') || ''
      });
    } else {
      setEditingBlog(null);
      setBlogForm({ title: '', slug: '', content: '', excerpt: '', image_url: '', tags: '' });
    }
    setIsBlogDialogOpen(true);
  }

  async function updateProfession() {
    try {
      const { error } = await supabase
        .from('professions')
        .upsert(profession);
      
      if (error) throw error;
      alert('Ayarlar kaydedildi!');
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      alert('Kaydetme başarısız.');
    }
  }

  async function updateExperienceStatus(id: number, status: 'approved' | 'rejected' | 'pending') {
    try {
      const { error } = await supabase
        .from('experiences')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      // Listeyi güncelle
      setExperiences(experiences.map(exp => 
        exp.id === id ? { ...exp, status } : exp
      ));
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      alert('İşlem başarısız.');
    }
  }

  async function deleteFaq(id: number) {
    if (!confirm('Bu soruyu silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setFaqs(faqs.filter(f => f.id !== id));
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Silme başarısız.');
    }
  }

  async function deleteBlog(id: string) {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Silme başarısız.');
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Yönetim Paneli</h1>
        
        <div className="flex items-center gap-2">
          <Label htmlFor="profession-select" className="whitespace-nowrap">Aktif Meslek:</Label>
          <select 
            id="profession-select"
            className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300 min-w-[200px]"
            value={selectedProfessionSlug}
            onChange={(e) => setSelectedProfessionSlug(e.target.value)}
          >
            {professions.map((p) => (
              <option key={p.slug} value={p.slug}>{p.title}</option>
            ))}
          </select>
        </div>
      </div>
      
      <Tabs defaultValue="experiences" onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="experiences">Tecrübe Paylaşımları</TabsTrigger>
          <TabsTrigger value="faqs">Sıkça Sorulan Sorular</TabsTrigger>
          <TabsTrigger value="documents">Dokümanlar</TabsTrigger>
          <TabsTrigger value="blogs">Blog Yönetimi</TabsTrigger>
          <TabsTrigger value="settings">Meslek Ayarları</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Doküman Yönetimi</CardTitle>
                <CardDescription>Kullanıcıların yüklediği ve sistemdeki tüm dokümanlar.</CardDescription>
              </div>
              <Button onClick={() => setIsDocDialogOpen(true)} className="gap-2">
                <UploadCloud className="w-4 h-4" /> Admin Olarak Yükle
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg items-start justify-between bg-slate-50 dark:bg-slate-900">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span className="font-semibold">{doc.title}</span>
                          <Badge variant="outline">{doc.file_type}</Badge>
                          <Badge className={
                            doc.status === 'approved' ? 'bg-green-500' : 
                            doc.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                          }>
                            {doc.status === 'approved' ? 'Yayında' : 
                             doc.status === 'rejected' ? 'Reddedildi' : 'Onay Bekliyor'}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{doc.description}</p>
                        <div className="text-xs text-slate-500 flex gap-4">
                          <span>Yükleyen: {doc.uploader_name}</span>
                          <span>Boyut: {doc.file_size}</span>
                          <a href={doc.file_url} target="_blank" className="text-blue-600 hover:underline flex items-center gap-1">
                            <Download className="w-3 h-3" /> İndir/Görüntüle
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 shrink-0">
                        {doc.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateDocumentStatus(doc.id, 'approved')}>
                              <CheckCircle className="w-4 h-4 mr-1" /> Onayla
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => updateDocumentStatus(doc.id, 'rejected')}>
                              <XCircle className="w-4 h-4 mr-1" /> Reddet
                            </Button>
                          </>
                        )}
                        {doc.status !== 'pending' && (
                           <Button size="sm" variant="outline" onClick={() => updateDocumentStatus(doc.id, 'pending')}>
                             Durumu Sıfırla
                           </Button>
                        )}
                        <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteDocument(doc.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {documents.length === 0 && <p className="text-center text-slate-500">Doküman bulunamadı.</p>}
                </div>
              )}
            </CardContent>
          </Card>

          <Dialog open={isDocDialogOpen} onOpenChange={setIsDocDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Admin Doküman Yükleme</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Başlık</Label>
                  <Input 
                    value={docForm.title} 
                    onChange={(e) => setDocForm({...docForm, title: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Açıklama</Label>
                  <Textarea 
                    value={docForm.description} 
                    onChange={(e) => setDocForm({...docForm, description: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Dosya</Label>
                  <Input 
                    type="file"
                    onChange={(e) => setDocFile(e.target.files ? e.target.files[0] : null)}
                  />
                </div>
                <Button onClick={handleUploadDocument} className="w-full" disabled={!docFile || !docForm.title}>
                  Yükle ve Yayınla
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="blogs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Blog Yönetimi</CardTitle>
                <CardDescription>Blog yazılarını ekleyin, düzenleyin veya silin.</CardDescription>
              </div>
              <Button onClick={() => openBlogDialog()} className="gap-2">
                <PlusCircle className="w-4 h-4" /> Yeni Yazı Ekle
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
              ) : (
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold truncate">{blog.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{blog.excerpt}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {blog.tags?.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button size="icon" variant="ghost" onClick={() => openBlogDialog(blog)}>
                            <Pencil className="w-4 h-4 text-blue-500" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteBlog(blog.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {blogs.length === 0 && <p className="text-center text-slate-500">Henüz hiç blog yazısı bulunmamaktadır.</p>}
                </div>
              )}
            </CardContent>
          </Card>

          <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingBlog ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı Ekle'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Başlık</Label>
                  <Input 
                    value={blogForm.title} 
                    onChange={(e) => setBlogForm({...blogForm, title: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input 
                    value={blogForm.slug} 
                    onChange={(e) => setBlogForm({...blogForm, slug: e.target.value})} 
                    placeholder="otomatik-olusturulacak"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Özet</Label>
                  <Textarea 
                    value={blogForm.excerpt} 
                    onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})} 
                    placeholder="Kısa bir özet yazın..."
                    className="h-24"
                  />
                </div>
                <div className="space-y-2">
                  <Label>İçerik</Label>
                  <Textarea 
                    value={blogForm.content} 
                    onChange={(e) => setBlogForm({...blogForm, content: e.target.value})} 
                    placeholder="Blog yazınızın içeriği..."
                    className="h-64 font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Görsel URL</Label>
                  <Input 
                    value={blogForm.image_url} 
                    onChange={(e) => setBlogForm({...blogForm, image_url: e.target.value})} 
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Etiketler (Virgülle ayrılmış)</Label>
                  <Input 
                    value={blogForm.tags} 
                    onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})} 
                    placeholder="React, Supabase, Tailwind CSS"
                  />
                </div>
                <Button onClick={handleSaveBlog} className="w-full">
                  {editingBlog ? 'Değişiklikleri Kaydet' : 'Yazıyı Yayınla'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Sayfa Ayarları</CardTitle>
              <CardDescription>
                {professions.find(p => p.slug === selectedProfessionSlug)?.title || 'Seçili meslek'} sayfası için genel ayarlar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
              ) : (
                <div className="space-y-4 max-w-2xl">
                  <div className="space-y-2">
                    <Label>Başlık</Label>
                    <Input 
                      value={profession?.title || ''} 
                      onChange={(e) => setProfession({...profession, title: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Açıklama</Label>
                    <Textarea 
                      value={profession?.description || ''} 
                      onChange={(e) => setProfession({...profession, description: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Video URL (YouTube Embed Link)</Label>
                    <Input 
                      value={profession?.video_url || ''} 
                      onChange={(e) => setProfession({...profession, video_url: e.target.value})} 
                      placeholder="https://www.youtube.com/embed/..."
                    />
                    <p className="text-xs text-slate-500">
                      Örnek: https://www.youtube.com/embed/dQw4w9WgXcQ
                    </p>
                  </div>
                  <Button onClick={updateProfession}>Kaydet</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experiences">
          <Card>
            <CardHeader>
              <CardTitle>Gelen Tecrübeler</CardTitle>
              <CardDescription>Onay bekleyen ve yayınlanan tecrübe paylaşımları.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
              ) : (
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg items-start justify-between bg-slate-50 dark:bg-slate-900">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{exp.name || 'Anonim'}</span>
                          <Badge variant="outline">{exp.profession}</Badge>
                          <Badge className={
                            exp.status === 'approved' ? 'bg-green-500' : 
                            exp.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                          }>
                            {exp.status === 'approved' ? 'Onaylandı' : 
                             exp.status === 'rejected' ? 'Reddedildi' : 'Bekliyor'}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {new Date(exp.created_at).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                          {exp.content}
                        </p>
                      </div>
                      
                      <div className="flex gap-2 shrink-0">
                        {exp.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateExperienceStatus(exp.id, 'approved')}>
                              <CheckCircle className="w-4 h-4 mr-1" /> Onayla
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => updateExperienceStatus(exp.id, 'rejected')}>
                              <XCircle className="w-4 h-4 mr-1" /> Reddet
                            </Button>
                          </>
                        )}
                        {exp.status !== 'pending' && (
                           <Button size="sm" variant="outline" onClick={() => updateExperienceStatus(exp.id, 'pending')}>
                             Durumu Sıfırla
                           </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {experiences.length === 0 && <p className="text-center text-slate-500">Kayıt bulunamadı.</p>}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tüm SSS'ler</CardTitle>
                <CardDescription>Sistemdeki tüm soruları yönetin.</CardDescription>
              </div>
              <Button onClick={() => openFaqDialog()} className="gap-2">
                <PlusCircle className="w-4 h-4" /> Yeni Soru Ekle
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
              ) : (
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="flex items-start justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                      <div className="space-y-1 flex-1 mr-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{faq.profession_slug}</Badge>
                          <Badge variant="outline" className="text-xs">Sıra: {faq.display_order}</Badge>
                          <span className="font-medium">{faq.question}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" onClick={() => openFaqDialog(faq)}>
                          <Pencil className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteFaq(faq.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {faqs.length === 0 && <p className="text-center text-slate-500">Soru bulunamadı.</p>}
                </div>
              )}
            </CardContent>
          </Card>

          <Dialog open={isFaqDialogOpen} onOpenChange={setIsFaqDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingFaq ? 'Soruyu Düzenle' : 'Yeni Soru Ekle'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Soru</Label>
                  <Input 
                    value={faqForm.question} 
                    onChange={(e) => setFaqForm({...faqForm, question: e.target.value})} 
                    placeholder="Örn: ZAB başvurusu ne kadar sürer?"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cevap</Label>
                  <Textarea 
                    value={faqForm.answer} 
                    onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})} 
                    placeholder="Detaylı cevap..."
                    className="h-32"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sıra No</Label>
                    <Input 
                      type="number"
                      value={faqForm.display_order} 
                      onChange={(e) => setFaqForm({...faqForm, display_order: parseInt(e.target.value)})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Meslek Slug</Label>
                    <Input 
                      value={faqForm.profession_slug} 
                      disabled
                      className="bg-slate-100"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveFaq} className="w-full">Kaydet</Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>

      {/* Blog Management Section - Yeni Eklendi */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Blog Yönetimi</h2>
        
        <Button onClick={() => openBlogDialog()} className="mb-4 gap-2">
          <PlusCircle className="w-4 h-4" /> Yeni Yazı Ekle
        </Button>

        {loading ? (
          <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold truncate">{blog.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{blog.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {blog.tags?.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="icon" variant="ghost" onClick={() => openBlogDialog(blog)}>
                      <Pencil className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteBlog(blog.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {blogs.length === 0 && <p className="text-center text-slate-500">Henüz hiç blog yazısı bulunmamaktadır.</p>}
          </div>
        )}

        <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBlog ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı Ekle'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Başlık</Label>
                <Input 
                  value={blogForm.title} 
                  onChange={(e) => setBlogForm({...blogForm, title: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input 
                  value={blogForm.slug} 
                  onChange={(e) => setBlogForm({...blogForm, slug: e.target.value})} 
                  placeholder="otomatik olarak oluşturulacak"
                  disabled={!!editingBlog}
                />
                {editingBlog && (
                  <p className="text-xs text-slate-500">
                    Düzenlemek için slug'ı değiştirebilirsiniz, aksi takdirde otomatik olarak mevcut başlığa göre oluşturulacaktır.
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Özet</Label>
                <Textarea 
                  value={blogForm.excerpt} 
                  onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})} 
                  placeholder="Kısa bir özet yazın..."
                  className="h-24"
                />
              </div>
              <div className="space-y-2">
                <Label>İçerik</Label>
                <Textarea 
                  value={blogForm.content} 
                  onChange={(e) => setBlogForm({...blogForm, content: e.target.value})} 
                  placeholder="Blog yazınızın içeriği..."
                  className="h-48"
                />
              </div>
              <div className="space-y-2">
                <Label>Görsel URL</Label>
                <Input 
                  value={blogForm.image_url} 
                  onChange={(e) => setBlogForm({...blogForm, image_url: e.target.value})} 
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label>Etiketler (Virgülle ayrılmış)</Label>
                <Input 
                  value={blogForm.tags} 
                  onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})} 
                  placeholder="React, Supabase, Tailwind CSS"
                />
              </div>
              <Button onClick={handleSaveBlog} className="w-full">
                {editingBlog ? 'Değişiklikleri Kaydet' : 'Yazıyı Yayınla'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
