'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { initialCommunityUpdates, CommunityUpdate } from '@/data/initial-community-updates';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Plus, 
  RefreshCw, 
  ArrowLeft,
  Filter,
  Send
} from 'lucide-react';
import Link from 'next/link';

export default function UpdatesAdminPage() {
  const [updates, setUpdates] = useState<CommunityUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [formCategory, setFormCategory] = useState('otobus-soforlugu');
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formSourceGroup, setFormSourceGroup] = useState('BUSFAHRER GRUBU');
  const [formType, setFormType] = useState<'tip' | 'official_rule' | 'experience' | 'warning'>('tip');
  const [formBadge, setFormBadge] = useState('Mart 2025');
  const [formTargetTab, setFormTargetTab] = useState<'updates' | 'experiences' | 'guide'>('updates');

  async function fetchUpdates() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('community_updates')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setUpdates(data as CommunityUpdate[]);
        setIsUsingFallback(false);
      } else {
        setUpdates(initialCommunityUpdates);
        setIsUsingFallback(true);
      }
    } catch {
      setUpdates(initialCommunityUpdates);
      setIsUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUpdates();
  }, []);

  async function toggleApproval(id: number | string, currentStatus: boolean) {
    if (isUsingFallback) {
      setUpdates(prev => prev.map(u => u.id === id ? { ...u, is_approved: !currentStatus } : u));
      return;
    }

    try {
      const { error } = await supabase
        .from('community_updates')
        .update({ is_approved: !currentStatus })
        .eq('id', id);

      if (!error) {
        setUpdates(prev => prev.map(u => u.id === id ? { ...u, is_approved: !currentStatus } : u));
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  }

  async function deleteUpdate(id: number | string) {
    if (!confirm('Bu güncellemeyi silmek istediğinize emin misiniz?')) return;

    if (isUsingFallback) {
      setUpdates(prev => prev.filter(u => u.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from('community_updates')
        .delete()
        .eq('id', id);

      if (!error) {
        setUpdates(prev => prev.filter(u => u.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  }

  async function handleAddUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!formTitle || !formContent) return;

    const newObj: Partial<CommunityUpdate> = {
      category_slug: formCategory,
      title: formTitle,
      content: formContent,
      source_group: formSourceGroup,
      update_type: formType,
      badge_text: formBadge,
      target_tab: formTargetTab,
      importance: 'highlight',
      is_approved: true,
      created_at: new Date().toISOString(),
    };

    if (isUsingFallback) {
      const createdItem: CommunityUpdate = {
        ...newObj,
        id: Date.now(),
      } as CommunityUpdate;
      setUpdates(prev => [createdItem, ...prev]);
      setShowAddForm(false);
      setFormTitle('');
      setFormContent('');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('community_updates')
        .insert([newObj])
        .select();

      if (!error && data) {
        setUpdates(prev => [data[0] as CommunityUpdate, ...prev]);
        setShowAddForm(false);
        setFormTitle('');
        setFormContent('');
      }
    } catch (err) {
      console.error('Insert error:', err);
    }
  }

  const categories = Array.from(new Set(updates.map(u => u.category_slug)));
  const filteredList = updates.filter(u => filterCategory === 'all' || u.category_slug === filterCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link 
              href="/admin" 
              className="inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Admin Paneline Dön
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Topluluk Güncellemeleri Yönetimi
              </h1>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Sparkles className="w-3 h-3 mr-1 text-blue-500" />
                Telegram & AI Akışı
              </Badge>
            </div>
            <p className="text-sm text-slate-500">
              Telegram gruplarından derlenen veya manuel girilen yeni bilgileri buradan denetleyebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchUpdates}
              disabled={loading}
              className="gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Yenile
            </Button>
            <Button
              size="sm"
              onClick={() => setShowAddForm(!showAddForm)}
              className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4" />
              Yeni Bilgi Ekle
            </Button>
          </div>
        </div>

        {/* Fallback notification */}
        {isUsingFallback && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center justify-between">
            <div>
              <strong>Bilgi:</strong> Supabase veritabanında <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded">community_updates</code> tablosu henüz çalıştırılmadığı için yerel başlangıç verileri görüntüleniyor.
            </div>
            <span className="font-semibold">Yerel Mod Aktif</span>
          </div>
        )}

        {/* Add Form */}
        {showAddForm && (
          <Card className="border-blue-200 dark:border-blue-900 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Yeni Topluluk Güncellemesi / İpucu Ekle</CardTitle>
              <CardDescription className="text-xs">
                Bir sayfaya anında yeni bir mevzuat değişikliği veya tecrübe notu ekleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddUpdate} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Kategori / Slug
                    </label>
                    <Input 
                      value={formCategory} 
                      onChange={e => setFormCategory(e.target.value)} 
                      placeholder="Örn: otobus-soforlugu, lokfuhrer"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Tür
                    </label>
                    <select
                      value={formType}
                      onChange={e => setFormType(e.target.value as any)}
                      className="w-full h-9 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 text-xs"
                    >
                      <option value="tip">Pratik İpucu & Tavsiye</option>
                      <option value="official_rule">Resmi Mevzuat & Kural</option>
                      <option value="experience">Topluluk Tecrübesi</option>
                      <option value="warning">Kritik Uyarı</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Rozet Metni
                    </label>
                    <Input 
                      value={formBadge} 
                      onChange={e => setFormBadge(e.target.value)} 
                      placeholder="Örn: Mart 2025, Yeni Kural"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Hedef Sekme
                    </label>
                    <select
                      value={formTargetTab}
                      onChange={e => setFormTargetTab(e.target.value as any)}
                      className="w-full h-9 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 text-xs"
                    >
                      <option value="updates">Güncel Gelişmeler</option>
                      <option value="guide">Kılavuz Notu (Guide)</option>
                      <option value="experiences">Tecrübeler</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Başlık
                    </label>
                    <Input 
                      value={formTitle} 
                      onChange={e => setFormTitle(e.target.value)} 
                      placeholder="Örn: Hessen Bölgesi İçin Yeni B2 Şartı"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Kaynak Telegram Grubu
                    </label>
                    <Input 
                      value={formSourceGroup} 
                      onChange={e => setFormSourceGroup(e.target.value)} 
                      placeholder="Örn: BUSFAHRER GRUBU"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Özet / Detay İçerik
                  </label>
                  <Textarea 
                    value={formContent} 
                    onChange={e => setFormContent(e.target.value)} 
                    rows={3}
                    placeholder="Paylaşılan tecrübenin ve ipucunun net açıklaması..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                    İptal
                  </Button>
                  <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Kaydet ve Yayınla
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filter */}
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Kategori Filtresi:</span>
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 rounded-md transition ${filterCategory === 'all' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-medium' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
          >
            Tümü ({updates.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-md transition ${filterCategory === cat ? 'bg-blue-600 text-white font-medium' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Updates List */}
        <div className="space-y-3">
          {filteredList.map(item => (
            <div 
              key={item.id} 
              className={`p-4 rounded-xl border bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${item.is_approved ? 'border-slate-200 dark:border-slate-800' : 'border-amber-300 bg-amber-50/20'}`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-semibold">
                    {item.category_slug}
                  </Badge>
                  <Badge className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {item.badge_text}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] bg-purple-50 text-purple-700 border-purple-200">
                    Sekme: {item.target_tab || 'updates'}
                  </Badge>
                  <span className="text-xs text-slate-400">
                    {new Date(item.created_at).toLocaleDateString('tr-TR')}
                  </span>
                  {!item.is_approved && (
                    <Badge variant="destructive" className="text-xs">
                      Onay Bekliyor
                    </Badge>
                  )}
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {item.content}
                </p>
                <div className="text-[11px] text-slate-400">
                  Kaynak: <span className="font-medium text-slate-600 dark:text-slate-300">{item.source_group}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant={item.is_approved ? 'outline' : 'default'}
                  className={item.is_approved ? 'text-xs text-slate-600' : 'text-xs bg-emerald-600 text-white'}
                  onClick={() => toggleApproval(item.id, item.is_approved)}
                >
                  {item.is_approved ? (
                    <>
                      <XCircle className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      Yayından Kaldır
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Onayla & Yayınla
                    </>
                  )}
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50"
                  onClick={() => deleteUpdate(item.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
