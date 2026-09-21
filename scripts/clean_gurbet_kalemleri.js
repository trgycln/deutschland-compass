require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const thanksPatterns = [
  'teşekkür', 'tesekkur', 'yüreğinize sağlık', 'yureginize saglik',
  'yüreginize saglik', 'kaleminize sağlık', 'kaleminize saglik',
  'başsağlığı', 'bassagligi', 'rahmet diliyor', 'mekanı cennet',
  'mekani cennet', 'başınız sağolsun', 'basiniz sagolsun',
  'allah rahmet eylesin', 'tebrik ederim', 'tebrikler',
  'başarılar', 'basarilar', 'kutluyorum', 'kutlarım', 'amin',
  'inşallah', 'insallah', 'geçmiş olsun', 'gecmis olsun',
  'öğretmenler gününüzü', 'ogretmenler gununuzu',
  'hayırlı cumalar', 'günaydın', 'iyi akşamlar', 'iyi geceler'
];

async function clean() {
  console.log("Fetching literary works...");
  const { data, error } = await supabase.from('literary_works').select('id, content, title');
  
  if (error) {
    console.error("Error fetching:", error);
    return;
  }
  
  console.log(`Found ${data.length} works. Scanning for non-literary chat messages...`);
  let deletedCount = 0;
  
  for (const work of data) {
    const text = (work.content || '') + ' ' + (work.title || '');
    const lower = text.toLowerCase();
    
    // Check if it's less than 200 chars and contains thanks/chat patterns
    const isShortAndChatty = text.length < 200 && thanksPatterns.some(p => lower.includes(p));
    
    // Check if it's very short (less than 80 chars) and doesn't look like a haiku/short poem
    const isVeryShortAndNotPoem = text.length < 80 && !text.includes('\n');
    
    if (isShortAndChatty || isVeryShortAndNotPoem) {
      console.log(`\nDeleting [ID: ${work.id}]:`);
      console.log(`Title: ${work.title}`);
      console.log(`Content: ${work.content}`);
      
      const { error: delError } = await supabase.from('literary_works').delete().eq('id', work.id);
      if (delError) {
        console.error("Error deleting:", delError);
      } else {
        deletedCount++;
      }
    }
  }
  
  console.log(`\nDone. Deleted ${deletedCount} non-literary messages.`);
}

clean();
