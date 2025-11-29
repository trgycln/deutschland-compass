
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function registerProfession() {
  const profession = {
    slug: 'cografya-ogretmenligi',
    title: 'Coğrafya Öğretmenliği',
    description: 'Almanya\'ya yeni gelen coğrafya öğretmenleri için denklik süreci, dil gereksinimleri ve kariyer fırsatlarını içeren kapsamlı rehber.',
    video_url: null
  };

  console.log(`Registering profession: ${profession.title} (${profession.slug})`);

  // Check if exists
  const { data: existing } = await supabase
    .from('professions')
    .select('slug')
    .eq('slug', profession.slug)
    .single();

  if (existing) {
    console.log('Profession already exists, updating...');
    const { error } = await supabase
      .from('professions')
      .update(profession)
      .eq('slug', profession.slug);

    if (error) {
      console.error('Error updating profession:', error);
    } else {
      console.log('Profession updated successfully');
    }
  } else {
    console.log('Creating new profession...');
    const { error } = await supabase
      .from('professions')
      .insert([profession]);

    if (error) {
      console.error('Error creating profession:', error);
    } else {
      console.log('Profession created successfully');
    }
  }
}

registerProfession();
