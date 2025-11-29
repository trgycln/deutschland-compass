
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function TestSupabasePage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        // Basit bir sorgu atarak bağlantıyı test et
        const { data, error } = await supabase.from('experiences').select('count', { count: 'exact', head: true });

        if (error) {
          throw error;
        }

        setStatus('success');
        setMessage('Supabase bağlantısı başarılı!');
        setDetails({
          url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Tanımlı' : 'Eksik',
          key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Tanımlı' : 'Eksik',
          tableCheck: 'Experiences tablosuna erişildi.'
        });

      } catch (err: any) {
        setStatus('error');
        setMessage('Bağlantı hatası oluştu.');
        setDetails(err);
        console.error(err);
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Supabase Bağlantı Testi
          </CardTitle>
        </CardHeader>
        <CardContent>
          {status === 'loading' && (
            <div className="flex flex-col items-center py-8 text-slate-500">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p>Bağlantı kontrol ediliyor...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center py-8 text-green-600">
              <CheckCircle2 className="w-12 h-12 mb-4" />
              <p className="font-bold text-lg">{message}</p>
              <div className="mt-4 text-sm text-slate-600 bg-slate-100 p-4 rounded w-full">
                <p>URL: {details?.url}</p>
                <p>Key: {details?.key}</p>
                <p>Tablo: {details?.tableCheck}</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center py-8 text-red-600">
              <AlertCircle className="w-12 h-12 mb-4" />
              <p className="font-bold text-lg">{message}</p>
              <div className="mt-4 text-xs text-slate-800 bg-red-50 p-4 rounded w-full overflow-auto max-h-40">
                <pre>{JSON.stringify(details, null, 2)}</pre>
              </div>
              <p className="mt-4 text-sm text-slate-500 text-center">
                Lütfen .env.local dosyasındaki bilgileri ve Supabase panelindeki RLS politikalarını kontrol edin.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
