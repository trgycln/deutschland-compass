'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, CheckCircle, XCircle, Trash2, Mail, ExternalLink, Pencil, UploadCloud, Download, FileText, MessageCircle, PlusCircle } from 'lucide-react';
import { professionsList } from '@/data/professions-list';

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

type Comment = {
  id: number;
  work_id: number;
  author_name: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at?: string;
};

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [operationInProgress, setOperationInProgress] = useState(false);
  
  // Dashboard Data
  const [pendingExperiences, setPendingExperiences] = useState<Experience[]>([]);
  const [pendingDocuments, setPendingDocuments] = useState<Document[]>([]);

  // Profession Selection
  const [professions, setProfessions] = useState<any[]>([]);
  const [selectedProfessionSlug, setSelectedProfessionSlug] = useState<string>('');
  const [professionSearch, setProfessionSearch] = useState('');
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

  // Experience Edit State
  const [isExpEditDialogOpen, setIsExpEditDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [expForm, setExpForm] = useState({ name: '', content: '', admin_note: '' });

  // Document Edit State
  const [isDocEditDialogOpen, setIsDocEditDialogOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [docEditForm, setDocEditForm] = useState({ title: '', description: '' });

  // Comments State
  const [comments, setComments] = useState<Comment[]>([]);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [isCommentEditDialogOpen, setIsCommentEditDialogOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [commentForm, setCommentForm] = useState({ author_name: '', content: '' });
  const [commentOperationInProgress, setCommentOperationInProgress] = useState(false);

  // Helper to render content with links
  const renderContent = (content: string) => {
    if (!content) return null;
    
    // Split by markdown links: [text](url)
    const parts = content.split(/(\[[^\]]+\]\([^)]+\))/g);
    
    return parts.map((part, i) => {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        return (
          <a 
            key={i} 
            href={match[2]} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1 mx-1"
          >
            <ExternalLink className="w-3 h-3" />
            {match[1]}
          </a>
        );
      }
      return part;
    });
  };

  useEffect(() => {
    setMounted(true);
    fetchProfessions();
    fetchDashboardData();
    fetchAllComments();
  }, []);

  useEffect(() => {
    if (selectedProfessionSlug && activeTab !== 'dashboard') {
      fetchData();
    }
  }, [activeTab, selectedProfessionSlug]);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      // Fetch all pending experiences
      const { data: expData, error: expError } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      
      if (expError) throw expError;
      setPendingExperiences(expData || []);

      // Fetch all pending documents
      const { data: docData, error: docError } = await supabase
        .from('documents')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      
      if (docError) throw docError;
      setPendingDocuments(docData || []);

    } catch (error) {
      console.error('Dashboard veri çekme hatası:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProfessions() {
    const { data, error } = await supabase
      .from('professions')
      .select('*')
      .order('title');
    
    const dbProfessions = data || [];

    // Add "Eğitim Rehberi" as a virtual profession for filtering
    const virtualProfessions = professionsList.map((p, index) => ({
      id: 9000 + index,
      title: p.title,
      slug: p.slug,
      description: p.description,
      video_url: ''
    }));

    // Filter out virtual professions that might already exist in data (to avoid duplicates)
    // Also merge titles if DB has empty title but we know the virtual title
    const mergedProfessions = dbProfessions.map(p => {
      const virtualMatch = virtualProfessions.find(vp => vp.slug === p.slug);
      if (virtualMatch && (!p.title || p.title.trim() === '')) {
        return { ...p, title: virtualMatch.title };
      }
      return p;
    });

    // Filter out any remaining professions without titles (garbage data)
    const validProfessions = mergedProfessions.filter(p => p.title && p.title.trim() !== '');

    const missingVirtuals = virtualProfessions.filter(vp => 
      !validProfessions.some(p => p.slug === vp.slug)
    );

    const combined = [...validProfessions, ...missingVirtuals];
    // Deduplicate by slug to prevent "duplicate key" errors
    const uniqueProfessions = Array.from(new Map(combined.map(item => [item.slug, item])).values());

    const allProfessions = uniqueProfessions.sort((a, b) => a.title.localeCompare(b.title));
    setProfessions(allProfessions);
    
    // Set default if not set
    if (!selectedProfessionSlug && allProfessions.length > 0) {
      setSelectedProfessionSlug(allProfessions[0].slug);
    }
  }

  async function fetchData() {
    if (!selectedProfessionSlug || activeTab === 'dashboard') return;

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
        
        if (data) {
          // If data exists but title is empty, try to find virtual title to populate form
          if (!data.title || data.title.trim() === '') {
            const virtualProf = professions.find(p => p.slug === selectedProfessionSlug);
            setProfession({ 
              ...data, 
              title: virtualProf?.title || '',
              description: data.description || virtualProf?.description || ''
            });
          } else {
            setProfession(data);
          }
        } else {
          // If not found in DB, try to find in virtual professions to populate defaults
          const virtualProf = professions.find(p => p.slug === selectedProfessionSlug);
          setProfession({ 
            slug: selectedProfessionSlug, 
            title: virtualProf?.title || '', 
            description: virtualProf?.description || '', 
            video_url: '' 
          });
        }
      }
    } catch (error: any) {
      console.error('Veri çekme hatası:', error);
      if (error?.message) {
        console.error('Hata mesajı:', error.message);
      }
      // Supabase bazen HTML hata sayfası döndürebilir (500 vs), bu durumda JSON parse hatası olur
      if (typeof error === 'object' && error !== null && Object.keys(error).length === 0) {
        console.error('Bilinmeyen hata (Muhtemelen sunucu/bağlantı hatası)');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUploadDocument() {
    if (!docFile || !docForm.title) {
      alert('Lütfen dosya seçin ve başlık girin.');
      return;
    }

    if (!selectedProfessionSlug) {
      alert('Lütfen önce bir meslek seçin.');
      return;
    }

    try {
      const fileExt = docFile.name.split('.').pop();
      // Sanitize file name
      const sanitizedFileName = docFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}_${sanitizedFileName}`;
      const filePath = `${selectedProfessionSlug}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, docFile, {
          cacheControl: '3600',
          upsert: false
        });

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
      alert('Doküman başarıyla yüklendi!');
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('Yükleme sırasında bir hata oluştu: ' + (error.message || error));
    }
  }

  async function updateDocumentStatus(id: number, status: 'approved' | 'rejected' | 'pending') {
    try {
      setOperationInProgress(true);
      const { error } = await supabase
        .from('documents')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      setDocuments(documents.map(doc => 
        doc.id === id ? { ...doc, status } : doc
      ));

      if (status !== 'pending') {
        setPendingDocuments(pendingDocuments.filter(d => d.id !== id));
      }

      const statusText = status === 'approved' ? 'Onaylandı' : status === 'rejected' ? 'Reddedildi' : 'Beklemeye Alındı';
      alert(`Döküman başarıyla ${statusText.toLowerCase()} oldu.`);
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      alert('İşlem başarısız. Lütfen tekrar deneyin.');
    } finally {
      setOperationInProgress(false);
    }
  }

  async function deleteDocument(id: number) {
    if (!confirm('Bu dokümanı silmek istediğinize emin misiniz?')) return;

    try {
      setOperationInProgress(true);
      
      const response = await fetch('/api/admin/delete-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, table: 'documents' }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Delete failed');
      }
      
      // Update local state immediately
      setDocuments(prev => prev.filter(d => d.id !== id));
      setPendingDocuments(prev => prev.filter(d => d.id !== id));
      
      alert('Döküman başarıyla silindi.');
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Silme başarısız. Lütfen tekrar deneyin.');
    } finally {
      setOperationInProgress(false);
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
      // Remove ID if it's a virtual ID (>= 9000) to let DB generate a real ID
      const professionToSave = { ...profession };
      if (professionToSave.id && professionToSave.id >= 9000) {
        delete professionToSave.id;
      }

      const { error } = await supabase
        .from('professions')
        .upsert(professionToSave, { onConflict: 'slug' });
      
      if (error) throw error;
      alert('Ayarlar kaydedildi!');
      
      // Refresh data to get the real ID if it was a new insertion
      fetchData();
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      alert('Kaydetme başarısız.');
    }
  }

  async function updateExperienceStatus(id: number, status: 'approved' | 'rejected' | 'pending') {
    try {
      setOperationInProgress(true);
      
      const response = await fetch('/api/admin/update-experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Update failed');
      }
      
      // Listeyi güncelle
      setExperiences(experiences.map(exp => 
        exp.id === id ? { ...exp, status } : exp
      ));

      // Dashboard listesini de güncelle
      if (status !== 'pending') {
        setPendingExperiences(pendingExperiences.filter(exp => exp.id !== id));
      }

      const statusText = status === 'approved' ? 'Onaylandı' : status === 'rejected' ? 'Reddedildi' : 'Beklemeye Alındı';
      alert(`Tecrübe başarıyla ${statusText.toLowerCase()} oldu.`);
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      alert('İşlem başarısız. Lütfen tekrar deneyin.');
    } finally {
      setOperationInProgress(false);
    }
  }

  async function deleteExperience(id: number) {
    if (!confirm('Bu mesajı/tecrübeyi tamamen silmek istediğinize emin misiniz?')) return;

    try {
      setOperationInProgress(true);
      
      const response = await fetch('/api/admin/delete-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, table: 'experiences' }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Delete failed');
      }
      
      // Update local state immediately
      setExperiences(prev => prev.filter(e => e.id !== id));
      setPendingExperiences(prev => prev.filter(e => e.id !== id));
      
      alert('Tecrübe başarıyla silindi.');
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Silme başarısız. Lütfen tekrar deneyin.');
    } finally {
      setOperationInProgress(false);
    }
  }

  function openExpEditDialog(exp: Experience) {
    setEditingExp(exp);
    setExpForm({ 
      name: exp.name, 
      content: exp.content,
      admin_note: '' // Admin notu şimdilik içeriğe eklenecek
    });
    setIsExpEditDialogOpen(true);
  }

  async function handleSaveExperience() {
    if (!editingExp) return;

    try {
      setOperationInProgress(true);
      const { error } = await supabase
        .from('experiences')
        .update({ 
          name: expForm.name,
          content: expForm.content
        })
        .eq('id', editingExp.id);

      if (error) throw error;

      // Update local state
      const updatedExp = { ...editingExp, name: expForm.name, content: expForm.content };
      
      setExperiences(experiences.map(e => e.id === editingExp.id ? updatedExp : e));
      setPendingExperiences(pendingExperiences.map(e => e.id === editingExp.id ? updatedExp : e));
      
      setIsExpEditDialogOpen(false);
      setEditingExp(null);
      
      alert('Tecrübe başarıyla kaydedildi.');
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      alert('Kaydetme başarısız. Lütfen tekrar deneyin.');
    } finally {
      setOperationInProgress(false);
    }
  }

  function openDocEditDialog(doc: Document) {
    setEditingDoc(doc);
    setDocEditForm({ 
      title: doc.title, 
      description: doc.description
    });
    setIsDocEditDialogOpen(true);
  }

  async function handleSaveDocument() {
    if (!editingDoc) return;

    try {
      setOperationInProgress(true);
      const { error } = await supabase
        .from('documents')
        .update({ 
          title: docEditForm.title,
          description: docEditForm.description
        })
        .eq('id', editingDoc.id);

      if (error) throw error;

      // Update local state
      const updatedDoc = { ...editingDoc, title: docEditForm.title, description: docEditForm.description };
      
      setDocuments(documents.map(d => d.id === editingDoc.id ? updatedDoc : d));
      setPendingDocuments(pendingDocuments.map(d => d.id === editingDoc.id ? updatedDoc : d));
      
      setIsDocEditDialogOpen(false);
      setEditingDoc(null);
      
      alert('Döküman başarıyla kaydedildi.');
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      alert('Kaydetme başarısız. Lütfen tekrar deneyin.');
    } finally {
      setOperationInProgress(false);
    }
  }

  // Fetch all comments for moderation
  async function fetchAllComments() {
    try {
      const { data, error } = await supabase
        .from('literary_work_comments')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setAllComments(data || [])
    } catch (error) {
      console.error('Error fetching comments:', error)
      alert('Yorumlar yüklenemedi.')
    }
  }

  // Open comment edit dialog
  function openCommentEditDialog(comment: Comment) {
    setEditingComment(comment)
    setCommentForm({
      author_name: comment.author_name,
      content: comment.content
    })
    setIsCommentEditDialogOpen(true)
  }

  // Close comment edit dialog
  function closeCommentEditDialog() {
    setIsCommentEditDialogOpen(false)
    setEditingComment(null)
    setCommentForm({ author_name: '', content: '' })
  }

  // Save comment
  async function handleSaveComment() {
    if (!editingComment) return

    if (!commentForm.author_name.trim() || !commentForm.content.trim()) {
      alert('Lütfen tüm alanları doldurunuz')
      return
    }

    try {
      setCommentOperationInProgress(true)
      const response = await fetch('/api/comments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingComment.id,
          author_name: commentForm.author_name,
          content: commentForm.content
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Güncelleme başarısız')
      }

      // Update local state
      const updated = await response.json()
      setAllComments(allComments.map(c => c.id === editingComment.id ? updated.comment : c))
      closeCommentEditDialog()
      alert('Yorum başarıyla güncellendi.')
    } catch (error) {
      console.error('Güncelleme hatası:', error)
      alert('Hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setCommentOperationInProgress(false)
    }
  }

  // Delete comment
  async function deleteComment(id: number) {
    if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) return

    try {
      setCommentOperationInProgress(true)
      const response = await fetch(`/api/comments?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Silme başarısız')
      }

      setAllComments(allComments.filter(c => c.id !== id))
      alert('Yorum başarıyla silindi.')
    } catch (error) {
      console.error('Silme hatası:', error)
      alert('Hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setCommentOperationInProgress(false)
    }
  }

  async function deleteFaq(id: number) {
    if (!confirm('Bu soruyu silmek istediğinize emin misiniz?')) return;

    try {
      const response = await fetch('/api/admin/delete-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, table: 'faqs' }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Delete failed');
      }
      
      setFaqs(faqs.filter(f => f.id !== id));
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Silme başarısız.');
    }
  }

  async function deleteBlog(id: string) {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;

    try {
      const response = await fetch('/api/admin/delete-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, table: 'blogs' }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Delete failed');
      }
      
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Silme başarısız.');
    }
  }

  async function toggleBlogStatus(blog: BlogPost) {
    try {
      const { error } = await supabase
        .from('blogs')
        .update({ is_published: !blog.is_published })
        .eq('id', blog.id);

      if (error) throw error;

      setBlogs(blogs.map(b => 
        b.id === blog.id ? { ...b, is_published: !b.is_published } : b
      ));
      
      alert(blog.is_published ? 'Blog yayından kaldırıldı.' : 'Blog yayınlandı.');
    } catch (error) {
      console.error('Error updating blog status:', error);
      alert('Durum güncellenirken bir hata oluştu.');
    }
  }

  if (!mounted) {
    return <div className="flex justify-center items-center min-h-screen"><Loader2 className="animate-spin w-8 h-8" /></div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Yönetim Paneli</h1>
          <Button 
            variant={selectedProfessionSlug === 'genel-katki' ? "default" : "outline"}
            onClick={() => {
              setSelectedProfessionSlug('genel-katki');
              setActiveTab('experiences');
            }}
            className="gap-2 ml-4"
          >
            <Mail className="w-4 h-4" />
            Gelen Kutusu
            {experiences.filter(e => e.status === 'pending' && e.profession === 'Genel Katkı / Öneri').length > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                {experiences.filter(e => e.status === 'pending' && e.profession === 'Genel Katkı / Öneri').length}
              </Badge>
            )}
          </Button>
        </div>
        
        <div className="flex flex-col gap-2 items-end">
          <Input 
            placeholder="Listede ara..." 
            value={professionSearch}
            onChange={(e) => setProfessionSearch(e.target.value)}
            className="w-[200px] h-8 text-xs"
          />
          <div className="flex items-center gap-2">
            <Label htmlFor="profession-select" className="whitespace-nowrap">Aktif Meslek:</Label>
            <select 
              id="profession-select"
              className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300 min-w-[200px]"
              value={selectedProfessionSlug}
              onChange={(e) => setSelectedProfessionSlug(e.target.value)}
            >
              {professions
                .filter(p => p.slug === selectedProfessionSlug || p.title.toLowerCase().includes(professionSearch.toLowerCase()))
                .map((p) => (
                <option key={p.slug} value={p.slug}>{p.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Genel Bakış</TabsTrigger>
          <TabsTrigger value="experiences">Tecrübe Paylaşımları</TabsTrigger>
          <TabsTrigger value="faqs">Sıkça Sorulan Sorular</TabsTrigger>
          <TabsTrigger value="documents">Dokümanlar</TabsTrigger>
          <TabsTrigger value="blogs">Blog Yönetimi</TabsTrigger>
          <TabsTrigger value="comments">Yorumlar</TabsTrigger>
          <TabsTrigger value="settings">Meslek Ayarları</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Pending Experiences & Contributions */}
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Bekleyen Mesajlar ve Katkılar
                  {pendingExperiences.length > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {pendingExperiences.length} Yeni
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Onay bekleyen kullanıcı yorumları, tecrübe paylaşımları ve iletişim mesajları.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
                ) : pendingExperiences.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500 opacity-50" />
                    <p>Bekleyen mesaj yok. Her şey güncel!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingExperiences.map((exp) => (
                      <div key={exp.id} className="p-4 border rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{exp.name || 'Anonim'}</span>
                              <Badge variant="outline" className="text-xs">{exp.profession}</Badge>
                            </div>
                            <span className="text-xs text-slate-500">
                              {new Date(exp.created_at).toLocaleDateString('tr-TR')}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-8" onClick={() => openExpEditDialog(exp)} disabled={operationInProgress} title="Düzenle">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700" onClick={() => updateExperienceStatus(exp.id, 'approved')} disabled={operationInProgress} title="Onayla">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" className="h-8" onClick={() => updateExperienceStatus(exp.id, 'rejected')} disabled={operationInProgress} title="Reddet">
                              <XCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteExperience(exp.id)} disabled={operationInProgress} title="Sil">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
                          {renderContent(exp.content)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pending Documents */}
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  Bekleyen Dökümanlar
                  {pendingDocuments.length > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {pendingDocuments.length} Yeni
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Kullanıcılar tarafından yüklenen ve onay bekleyen dosyalar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
                ) : pendingDocuments.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500 opacity-50" />
                    <p>Bekleyen döküman yok.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingDocuments.map((doc) => (
                      <div key={doc.id} className="p-4 border rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 min-w-0 mr-2">
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                              <span className="font-semibold text-sm truncate" title={doc.title}>{doc.title}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-2">
                              <Badge variant="secondary" className="text-xs">{doc.profession_slug}</Badge>
                              <span>{(parseInt(doc.file_size) / 1024 / 1024).toFixed(2)} MB</span>
                              <span>{doc.uploader_name}</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                              {doc.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline" className="h-8" onClick={() => openDocEditDialog(doc)} disabled={operationInProgress} title="Düzenle">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8" asChild title="İncele">
                            <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4" />
                            </a>
                          </Button>
                          <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700" onClick={() => updateDocumentStatus(doc.id, 'approved')} disabled={operationInProgress} title="Onayla">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" className="h-8" onClick={() => updateDocumentStatus(doc.id, 'rejected')} disabled={operationInProgress} title="Reddet">
                            <XCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteDocument(doc.id)} disabled={operationInProgress} title="Sil">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

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
                        <Button size="sm" variant="outline" onClick={() => openDocEditDialog(doc)}>
                          <Pencil className="w-4 h-4 mr-1" /> Düzenle
                        </Button>
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
                    <div key={blog.id} className={`p-4 border rounded-lg ${blog.is_published ? 'bg-white dark:bg-slate-950' : 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800'}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {blog.is_published ? (
                              <Badge variant="default" className="bg-green-600 hover:bg-green-700">Yayında</Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Onay Bekliyor</Badge>
                            )}
                            <span className="text-xs text-slate-500">{new Date(blog.created_at).toLocaleDateString('tr-TR')}</span>
                            <span className="text-xs text-slate-500">• {blog.author}</span>
                          </div>
                          <h3 className="text-lg font-semibold truncate">{blog.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{blog.excerpt}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {blog.tags?.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0 items-center">
                          {!blog.is_published && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => toggleBlogStatus(blog)}>
                              <CheckCircle className="w-4 h-4 mr-2" /> Onayla
                            </Button>
                          )}
                          {blog.is_published && (
                            <Button size="sm" variant="outline" onClick={() => toggleBlogStatus(blog)}>
                              Yayından Kaldır
                            </Button>
                          )}
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

        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                Yorum Yönetimi
                {allComments.length > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {allComments.length} Toplam
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Tüm şiir ve yazılara yapılan yorumları düzenleyin ve silin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {allComments.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">Henüz yorum yok</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {allComments.map((comment) => (
                    <div key={comment.id} className="p-4 border rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{comment.author_name}</p>
                          <p className="text-xs text-slate-500">Eser ID: {comment.work_id} • {new Date(comment.created_at).toLocaleDateString('tr-TR')}</p>
                        </div>
                        <Badge className={
                          comment.status === 'approved' ? 'bg-green-600' :
                          comment.status === 'rejected' ? 'bg-red-600' : 'bg-yellow-600'
                        }>
                          {comment.status === 'approved' ? 'Onaylandı' : 
                           comment.status === 'rejected' ? 'Reddedildi' : 'Bekliyor'}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 whitespace-pre-wrap bg-slate-50 dark:bg-slate-800 p-3 rounded-md font-serif">
                        {comment.content}
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => openCommentEditDialog(comment)}
                          disabled={commentOperationInProgress}
                        >
                          <Pencil className="w-4 h-4 mr-1" />
                          Düzelt
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteComment(comment.id)}
                          disabled={commentOperationInProgress}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Sil
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comment Edit Dialog */}
          <Dialog open={isCommentEditDialogOpen} onOpenChange={setIsCommentEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Yorumu Düzelt</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="commentAuthor">Yorum Yapan Kişi</Label>
                  <Input
                    id="commentAuthor"
                    value={commentForm.author_name}
                    onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                    disabled={commentOperationInProgress}
                  />
                </div>
                <div>
                  <Label htmlFor="commentContent">Yorum İçeriği</Label>
                  <Textarea
                    id="commentContent"
                    value={commentForm.content}
                    onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                    className="h-40 font-serif"
                    disabled={commentOperationInProgress}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={closeCommentEditDialog} disabled={commentOperationInProgress}>
                    İptal
                  </Button>
                  <Button onClick={handleSaveComment} disabled={commentOperationInProgress}>
                    {commentOperationInProgress ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                </div>
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
                    <Label>NotebookLM Video URL (YouTube Embed Link)</Label>
                    <Input 
                      value={profession?.video_url || ''} 
                      onChange={(e) => setProfession({...profession, video_url: e.target.value})} 
                      placeholder="https://www.youtube.com/embed/..."
                    />
                    <p className="text-xs text-slate-500">
                      NotebookLM tarafından oluşturulan videonun YouTube embed linkini buraya yapıştırın.
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
                          {renderContent(exp.content)}
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

      {/* Experience Edit Dialog */}
      <Dialog open={isExpEditDialogOpen} onOpenChange={setIsExpEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tecrübe/Mesajı Düzenle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Ad/Soyadı</Label>
              <Input 
                value={expForm.name} 
                onChange={(e) => setExpForm({...expForm, name: e.target.value})} 
                placeholder="Örn: Ahmet Yılmaz"
              />
            </div>
            <div className="space-y-2">
              <Label>İçerik</Label>
              <Textarea 
                value={expForm.content} 
                onChange={(e) => setExpForm({...expForm, content: e.target.value})} 
                placeholder="Tecrübe veya mesaj..."
                className="h-40"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsExpEditDialogOpen(false)}>İptal</Button>
              <Button onClick={handleSaveExperience} disabled={operationInProgress}>
                {operationInProgress ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Edit Dialog */}
      <Dialog open={isDocEditDialogOpen} onOpenChange={setIsDocEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Dökümanı Düzenle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Başlık</Label>
              <Input 
                value={docEditForm.title} 
                onChange={(e) => setDocEditForm({...docEditForm, title: e.target.value})} 
                placeholder="Döküman başlığı"
              />
            </div>
            <div className="space-y-2">
              <Label>Açıklama</Label>
              <Textarea 
                value={docEditForm.description} 
                onChange={(e) => setDocEditForm({...docEditForm, description: e.target.value})} 
                placeholder="Döküman açıklaması"
                className="h-32"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsDocEditDialogOpen(false)}>İptal</Button>
              <Button onClick={handleSaveDocument} disabled={operationInProgress}>
                {operationInProgress ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
