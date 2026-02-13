#!/usr/bin/env node

/**
 * Bu script yazarları birleştirmek için kullanılır
 * Örn: "Ahmet 1234" tüm eserlerini "Ahmet 1234 / Cafer Baser" olarak günceller
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase credentials eksik!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function consolidateAuthors(oldAuthor, newAuthor) {
  try {
    console.log(`\n📚 "${oldAuthor}" yazarının eserlerini aranıyor...`);

    // Eski yazarın eserlerini bul
    const { data: oldWorks, error: fetchError } = await supabase
      .from('literary_works')
      .select('*')
      .eq('author', oldAuthor);

    if (fetchError) {
      console.error('❌ Hata:', fetchError.message);
      return;
    }

    console.log(`✓ ${oldWorks?.length || 0} eser bulundu`);

    if (!oldWorks || oldWorks.length === 0) {
      console.log(`⚠️ "${oldAuthor}" yazarına ait eser bulunamadı`);
      return;
    }

    // Eşleşen eserler listesini göster
    console.log(`\n📄 Güncellenecek eserler:`);
    oldWorks.forEach((work) => {
      console.log(`  - [ID: ${work.id}] "${work.title}" (${work.type})`);
    });

    // Güncellemeleri yap
    console.log(`\n⏳ "${oldAuthor}" → "${newAuthor}" başlamıştır...`);

    const { error: updateError, count } = await supabase
      .from('literary_works')
      .update({ author: newAuthor, updated_at: new Date().toISOString() })
      .eq('author', oldAuthor);

    if (updateError) {
      console.error('❌ Güncelleme hatası:', updateError.message);
      return;
    }

    console.log(`✅ ${count} eser başarıyla güncellendi!`);

    // Sonuçları kontrol et
    const { data: newWorks, error: verifyError } = await supabase
      .from('literary_works')
      .select('*')
      .eq('author', newAuthor);

    if (!verifyError) {
      console.log(`\n📊 Sonuç: "${newAuthor}" yazarının toplam ${newWorks?.length || 0} eseri var`);
    }
  } catch (error) {
    console.error('❌ Hata oluştu:', error.message);
  }
}

// Kullanım
const oldAuthor = process.argv[2] || 'Ahmet 1234';
const newAuthor = process.argv[3] || 'Ahmet 1234 / Cafer Baser';

console.log('🔄 Yazar Birleştirme Araci');
console.log('═════════════════════════════════');
console.log(`Eski Yazar: "${oldAuthor}"`);
console.log(`Yeni Yazar: "${newAuthor}"`);

consolidateAuthors(oldAuthor, newAuthor);
