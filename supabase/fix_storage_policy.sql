-- Storage Policies için düzeltme
-- Bu komutlar 'documents' isimli bucket'a herkesin dosya yüklemesine izin verir.

-- 1. Dosya Yükleme İzni (INSERT)
create policy "Herkes dosya yükleyebilir"
on storage.objects for insert
with check ( bucket_id = 'documents' );

-- 2. Dosya Okuma İzni (SELECT) - Eğer bucket "Public" değilse bu gereklidir
create policy "Herkes dosyaları görebilir"
on storage.objects for select
using ( bucket_id = 'documents' );

-- 3. Documents Tablosu için Garanti İzin (Eğer önceki çalışmadıysa)
drop policy if exists "Anyone can upload documents" on public.documents;
create policy "Anyone can upload documents"
  on public.documents for insert
  with check (true);
