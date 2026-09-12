const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Helper to extract address & city from decoded google maps place string
// e.g. "Big Brothers Burger House, Vordere Karlstraße 68, 73033 Göppingen"
// e.g. "Café Eishorn, Bocksgasse 36, 73525 Schwäbisch Gmünd"
// e.g. "hamseefischhaus, Ostheimer Str. 75, 51103 Köln"
function parseGooglePlace(placeStr) {
  const parts = placeStr.split(',').map(s => s.trim().replace(/\+/g, ' '));
  if (parts.length <= 1) return null;

  let city = null;
  let address = null;

  // German address pattern: "12345 CityName" or "CityName"
  for (let i = parts.length - 1; i >= 1; i--) {
    const part = parts[i];
    // Exclude country names like 'Almanya', 'Deutschland', 'Germany'
    if (/^(deutschland|germany|almanya|niederlande|österreich|frankreich)$/i.test(part)) {
      continue;
    }
    // Match postal code + city: "73033 Göppingen"
    const plMatch = part.match(/(?:[A-Z]{1,2}-)?\d{4,5}\s+([A-Za-zäöüÄÖÜß\s\.-]+)/);
    if (plMatch) {
      city = plMatch[1].trim();
      // Address is usually the preceding part
      if (i > 1) {
        address = parts[i - 1].trim();
      }
      break;
    }
    // Match simple city name if no postal code
    if (!city && /^[A-Za-zäöüÄÖÜß\s\.-]+$/.test(part) && part.length > 2) {
      city = part.trim();
      if (i > 1) {
        address = parts[i - 1].trim();
      }
    }
  }

  return { city, address, raw: parts };
}

async function run() {
  const { data: places, error } = await supabase
    .from('places')
    .select('id, name, city, address, map_link')
    .eq('city', 'Bilinmiyor');

  if (error) {
    console.error('Error fetching places:', error);
    return;
  }

  console.log(`Found ${places.length} places with city='Bilinmiyor'`);

  let resolvedCount = 0;
  for (const p of places) {
    if (!p.map_link) continue;
    try {
      const res = await fetch(p.map_link, { redirect: 'manual' });
      const loc = res.headers.get('location');
      if (loc) {
        const decoded = decodeURIComponent(loc);
        const match = decoded.match(/\/maps\/place\/([^/]+)/);
        if (match) {
          const parsed = parseGooglePlace(match[1]);
          if (parsed && parsed.city) {
            resolvedCount++;
            console.log(`[${resolvedCount}] ${p.name} => City: "${parsed.city}" | Addr: "${parsed.address || ''}"`);
          }
        }
      }
    } catch (e) {
      // ignore network errors
    }
  }

  console.log(`\nSuccessfully resolved ${resolvedCount} out of ${places.length} unknown places!`);
}

run();
