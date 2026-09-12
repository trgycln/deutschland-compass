const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function testBatch() {
  const { data } = await supabase.from('places').select('id, name, city, map_link').eq('city', 'Bilinmiyor').limit(10);
  for (const p of data) {
    if (!p.map_link) continue;
    try {
      const res = await fetch(p.map_link, { redirect: 'manual' });
      const loc = res.headers.get('location');
      if (loc) {
        const decoded = decodeURIComponent(loc);
        const m = decoded.match(/\/maps\/place\/([^/]+)/);
        if (m) {
          const parts = m[1].split(',').map(s => s.trim().replace(/\+/g, ' '));
          console.log(`${p.name} -> ${parts.join(' | ')}`);
        } else {
          console.log(`${p.name} -> No match in: ${decoded}`);
        }
      } else {
        console.log(`${p.name} -> No location header (status ${res.status})`);
      }
    } catch (e) {
      console.log(`${p.name} -> error: ${e.message}`);
    }
  }
}
testBatch();
