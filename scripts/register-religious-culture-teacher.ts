import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const profession = {
  slug: 'din-kulturu-ogretmenligi',
  title: 'Din Kültürü Öğretmenliği',
  description: 'Almanya\'ya yeni gelen din kültürü öğretmenleri için denklik süreci, Türkçe ve İslam dersleri fırsatları ve kariyer rehberi.',
  video_url: null
};

async function registerProfession() {
  console.log(`Registering profession: ${profession.title}...`);

  const { data, error } = await supabase
    .from('professions')
    .upsert(profession, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('Error registering profession:', error);
    process.exit(1);
  }

  console.log('Profession registered successfully:', data);
}

registerProfession();
