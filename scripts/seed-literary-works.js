// Supabase'e 97 eseri yüklemek için Node.js script
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role key kullan

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase credentials eksik. .env.local dosyasını kontrol edin.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 97 eseri literary-works.json dosyasından oku
const worksPath = path.join(__dirname, '../data/literary-works.json');
let works = [];

try {
  const worksData = fs.readFileSync(worksPath, 'utf8');
  works = JSON.parse(worksData);
  console.log(`📖 ${works.length} eser JSON dosyasından okundu.`);
} catch (error) {
  console.error('❌ literary-works.json dosyası okunamadı:', error.message);
  console.log('💡 İpucu: scripts klasörünün bir üst dizininde data/literary-works.json dosyası olmalı');
  process.exit(1);
}

async function seedLiteraryWorks() {
  console.log('🚀 Gurbet Kalemleri veritabanı seed başlıyor...');
  console.log(`📚 ${works.length} eser yüklenecek...`);

  try {
    // Önce mevcut verileri kontrol et
    const { count: existingCount } = await supabase
      .from('literary_works')
      .select('*', { count: 'exact', head: true });

    console.log(`📊 Mevcut eser sayısı: ${existingCount || 0}`);

    // Batch insert (Supabase 1000 row limit var, biz 97 tane yüklüyoruz)
    const { data, error } = await supabase
      .from('literary_works')
      .insert(works.map(work => ({
        ...work,
        is_approved: true, // İlk yüklemede tüm eserler onaylı
        submitted_by: 'admin'
      })))
      .select();

    if (error) {
      console.error('❌ Hata:', error);
      process.exit(1);
    }

    console.log(`✅ ${data.length} eser başarıyla yüklendi!`);
    console.log('🎉 Seed işlemi tamamlandı!');
  } catch (error) {
    console.error('❌ Beklenmeyen hata:', error);
    process.exit(1);
  }
}

seedLiteraryWorks();
