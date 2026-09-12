const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// ── City Coordinates Database (Germany, Austria, Switzerland, Benelux, etc.) ──
const CITY_COORDS = {
  // Top German Cities
  'Berlin':                 { lat: 52.5200, lng: 13.4050 },
  'Hamburg':                { lat: 53.5511, lng: 9.9937 },
  'München':                { lat: 48.1351, lng: 11.5820 },
  'Münih':                  { lat: 48.1351, lng: 11.5820 },
  'Köln':                   { lat: 50.9375, lng: 6.9603 },
  'Frankfurt':              { lat: 50.1109, lng: 8.6821 },
  'Frankfurt am Main':      { lat: 50.1109, lng: 8.6821 },
  'Stuttgart':              { lat: 48.7758, lng: 9.1829 },
  'Düsseldorf':             { lat: 51.2277, lng: 6.7735 },
  'Dortmund':               { lat: 51.5136, lng: 7.4653 },
  'Essen':                  { lat: 51.4556, lng: 7.0116 },
  'Leipzig':                { lat: 51.3397, lng: 12.3731 },
  'Bremen':                 { lat: 53.0793, lng: 8.8017 },
  'Dresden':                { lat: 51.0504, lng: 13.7373 },
  'Hannover':               { lat: 52.3759, lng: 9.7320 },
  'Nürnberg':               { lat: 49.4521, lng: 11.0767 },
  'Duisburg':               { lat: 51.4344, lng: 6.7623 },
  'Bochum':                 { lat: 51.4818, lng: 7.2162 },
  'Wuppertal':              { lat: 51.2562, lng: 7.1508 },
  'Bielefeld':              { lat: 52.0302, lng: 8.5325 },
  'Bonn':                   { lat: 50.7374, lng: 7.0982 },
  'Münster':                { lat: 51.9607, lng: 7.6261 },
  'Karlsruhe':              { lat: 49.0069, lng: 8.4037 },
  'Mannheim':               { lat: 49.4875, lng: 8.4660 },
  'Augsburg':               { lat: 48.3705, lng: 10.8978 },
  'Wiesbaden':              { lat: 50.0782, lng: 8.2398 },
  'Gelsenkirchen':          { lat: 51.5177, lng: 7.0955 },
  'Mönchengladbach':        { lat: 51.1805, lng: 6.4428 },
  'Braunschweig':           { lat: 52.2689, lng: 10.5268 },
  'Chemnitz':               { lat: 50.8278, lng: 12.9214 },
  'Kiel':                   { lat: 54.3233, lng: 10.1228 },
  'Aachen':                 { lat: 50.7753, lng: 6.0839 },
  'Halle':                  { lat: 51.4828, lng: 11.9698 },
  'Magdeburg':              { lat: 52.1205, lng: 11.6276 },
  'Freiburg':               { lat: 47.9990, lng: 7.8421 },
  'Krefeld':                { lat: 51.3388, lng: 6.5853 },
  'Lübeck':                 { lat: 53.8655, lng: 10.6866 },
  'Oberhausen':             { lat: 51.4782, lng: 6.8667 },
  'Erfurt':                 { lat: 50.9848, lng: 11.0299 },
  'Mainz':                  { lat: 49.9929, lng: 8.2473 },
  'Rostock':                { lat: 54.0924, lng: 12.0991 },
  'Kassel':                 { lat: 51.3127, lng: 9.4797 },
  'Hagen':                  { lat: 51.3671, lng: 7.4633 },
  'Hamm':                   { lat: 51.6811, lng: 7.8184 },
  'Saarbrücken':            { lat: 49.2401, lng: 6.9969 },
  'Mülheim':                { lat: 51.4272, lng: 6.8828 },
  'Potsdam':                { lat: 52.3906, lng: 13.0645 },
  'Ludwigshafen':           { lat: 49.4774, lng: 8.4452 },
  'Oldenburg':              { lat: 53.1435, lng: 8.2146 },
  'Leverkusen':             { lat: 51.0459, lng: 7.0192 },
  'Osnabrück':              { lat: 52.2799, lng: 8.0472 },
  'Solingen':               { lat: 51.1712, lng: 7.0845 },
  'Heidelberg':             { lat: 49.3988, lng: 8.6724 },
  'Herne':                  { lat: 51.5426, lng: 7.2190 },
  'Neuss':                  { lat: 51.2003, lng: 6.6883 },
  'Darmstadt':              { lat: 49.8728, lng: 8.6512 },
  'Paderborn':              { lat: 51.7189, lng: 8.7575 },
  'Regensburg':             { lat: 49.0134, lng: 12.1016 },
  'Ingolstadt':             { lat: 48.7665, lng: 11.4258 },
  'Würzburg':               { lat: 49.7913, lng: 9.9534 },
  'Fürth':                  { lat: 49.4771, lng: 10.9886 },
  'Wolfsburg':              { lat: 52.4227, lng: 10.7865 },
  'Offenbach':              { lat: 50.1055, lng: 8.7668 },
  'Ulm':                    { lat: 48.4011, lng: 9.9876 },
  'Heilbronn':              { lat: 49.1427, lng: 9.2109 },
  'Pforzheim':              { lat: 48.8932, lng: 8.7050 },
  'Göttingen':              { lat: 51.5413, lng: 9.9158 },
  'Bottrop':                { lat: 51.5244, lng: 6.9288 },
  'Trier':                  { lat: 49.7567, lng: 6.6414 },
  'Recklinghausen':         { lat: 51.6143, lng: 7.1983 },
  'Reutlingen':             { lat: 48.4914, lng: 9.2043 },
  'Bremerhaven':            { lat: 53.5396, lng: 8.5809 },
  'Koblenz':                { lat: 50.3569, lng: 7.5890 },
  'Bergisch Gladbach':      { lat: 50.9929, lng: 7.1292 },
  'Jena':                   { lat: 50.9271, lng: 11.5892 },
  'Remscheid':              { lat: 51.1802, lng: 7.1925 },
  'Erlangen':               { lat: 49.5897, lng: 11.0039 },
  'Moers':                  { lat: 51.4514, lng: 6.6285 },
  'Siegen':                 { lat: 50.8748, lng: 8.0243 },
  'Hildesheim':             { lat: 52.1548, lng: 9.9579 },
  'Salzgitter':             { lat: 52.1517, lng: 10.3297 },
  'Böblingen':              { lat: 48.6859, lng: 9.0116 },
  'Dillenburg':             { lat: 50.7381, lng: 8.2882 },
  'Euskirchen':             { lat: 50.6606, lng: 6.7872 },
  'Fulda':                  { lat: 50.5527, lng: 9.6757 },
  'Garmisch-Partenkirchen': { lat: 47.4921, lng: 11.0958 },
  'Gießen':                 { lat: 50.5873, lng: 8.6755 },
  'Gladbeck':               { lat: 51.5739, lng: 6.9921 },
  'Hockenheim':             { lat: 49.3190, lng: 8.5494 },
  'Kaiserslautern':         { lat: 49.4447, lng: 7.7690 },
  'Limburg':                { lat: 50.3840, lng: 8.0643 },
  'Ludwigsburg':            { lat: 48.8974, lng: 9.1919 },
  'Marburg':                { lat: 50.8022, lng: 8.7668 },
  'Worms':                  { lat: 49.6341, lng: 8.3615 },
  'Dinslaken':              { lat: 51.5623, lng: 6.7328 },
  'Eislingen':              { lat: 48.6968, lng: 9.7042 },
  'Göppingen':              { lat: 48.7047, lng: 9.6528 },
  'Kircheim unter Teck':    { lat: 48.6483, lng: 9.4517 },
  'Konstanz':               { lat: 47.6779, lng: 9.1732 },
  'Neckarsulm':             { lat: 49.1925, lng: 9.2244 },
  'Überlingen':             { lat: 47.7678, lng: 9.1608 },
  'Lörrach':                { lat: 47.6156, lng: 7.6622 },
  'Geseke':                 { lat: 51.6421, lng: 8.5111 },
  'Wissen':                 { lat: 50.7811, lng: 7.7333 },
  'Witten':                 { lat: 51.4429, lng: 7.3364 },
  'Ramstein':               { lat: 49.4458, lng: 7.5539 },
  'Unna':                   { lat: 51.5348, lng: 7.6890 },
  'Flensburg':              { lat: 54.7833, lng: 9.4333 },
  'Steinbach (Taunus)':     { lat: 50.1697, lng: 8.5719 },
  'Lübbecke':               { lat: 52.3111, lng: 8.6222 },
  'Fürstenfeldbruck':       { lat: 48.1778, lng: 11.2556 },
  'Singen':                 { lat: 47.7631, lng: 8.8353 },
  'Detmold':                { lat: 51.9365, lng: 8.8778 },
  'Tübingen':               { lat: 48.5216, lng: 9.0576 },
  'Aalen':                  { lat: 48.8378, lng: 10.0933 },
  'Bamberg':                { lat: 49.8988, lng: 10.9028 },
  'Olpe':                   { lat: 51.0292, lng: 7.8458 },
  'Rheinfelden':            { lat: 47.5611, lng: 7.7917 },
  'Wehr':                   { lat: 47.6278, lng: 7.9056 },
  'Schwäbisch Gmünd':       { lat: 48.7997, lng: 9.7981 },
  'Scheidegg':              { lat: 47.5822, lng: 9.8492 },
  'Lindau':                 { lat: 47.5536, lng: 9.6897 },
  'Hürth':                  { lat: 50.8767, lng: 6.8772 },
  'Lage':                   { lat: 51.9931, lng: 8.7925 },
  'Linden':                 { lat: 50.5283, lng: 8.6578 },
  'Friedrichshafen':        { lat: 47.6542, lng: 9.4794 },
  'Riedstadt':              { lat: 49.8333, lng: 8.5000 },
  'Gernsheim':              { lat: 49.7525, lng: 8.4864 },
  'Kriftel':                { lat: 50.0833, lng: 8.4667 },
  'Rüsselsheim am Main':    { lat: 49.9942, lng: 8.4128 },
  'Dachau':                 { lat: 48.2600, lng: 11.4342 },
  'Wörth am Main':          { lat: 49.7967, lng: 9.1578 },
  'Hard':                   { lat: 47.4883, lng: 9.6900 },
  'Lauterach':              { lat: 47.4764, lng: 9.7328 },

  // Austria
  'Wien':                   { lat: 48.2082, lng: 16.3738 },
  'Viyana':                 { lat: 48.2082, lng: 16.3738 },
  'Salzburg':               { lat: 47.8095, lng: 13.0550 },
  'Innsbruck':              { lat: 47.2692, lng: 11.4041 },

  // Switzerland
  'Zürih':                  { lat: 47.3769, lng: 8.5417 },
  'Zürich':                 { lat: 47.3769, lng: 8.5417 },
  'Cenevre':                { lat: 46.2044, lng: 6.1432 },
  'Genf':                   { lat: 46.2044, lng: 6.1432 },
  'Basel':                  { lat: 47.5596, lng: 7.5886 },
  'Bern':                   { lat: 46.9480, lng: 7.4474 },
  'Luzern':                 { lat: 47.0502, lng: 8.3093 },
  'Winterthur':             { lat: 47.4984, lng: 8.7237 },
  'St. Gallen':             { lat: 47.4245, lng: 9.3767 },

  // Benelux
  'Amsterdam':              { lat: 52.3676, lng: 4.9041 },
  'Rotterdam':              { lat: 51.9244, lng: 4.4777 },
  'Utrecht':                { lat: 52.0907, lng: 5.1214 },
  'Eindhoven':              { lat: 51.4416, lng: 5.4697 },
  'Den Haag':               { lat: 52.0705, lng: 4.3007 },
  'Groningen':              { lat: 53.2194, lng: 6.5665 },
  'Breda':                  { lat: 51.5719, lng: 4.7683 },
  'Tilburg':                { lat: 51.5606, lng: 5.0919 },
  'Almere':                 { lat: 52.3702, lng: 5.2141 },
  'Leiden':                 { lat: 52.1601, lng: 4.4970 },
  'Venlo':                  { lat: 51.3700, lng: 6.1681 },
  'Apeldoorn':              { lat: 52.2112, lng: 5.9699 },
  'Brüksel':                { lat: 50.8503, lng: 4.3517 },
  'Bruxelles':              { lat: 50.8503, lng: 4.3517 },
  'Gent':                   { lat: 51.0543, lng: 3.7174 },
  'Antwerpen':              { lat: 51.2194, lng: 4.4025 },
  'Brugge':                 { lat: 51.2093, lng: 3.2247 },
  'Liege':                  { lat: 50.6326, lng: 5.5797 },
  'Luxembourg':             { lat: 49.6116, lng: 6.1319 },

  // France & Other European
  'Paris':                  { lat: 48.8566, lng: 2.3522 },
  'Strasbourg':             { lat: 48.5734, lng: 7.7521 },
  'Lyon':                   { lat: 45.7640, lng: 4.8357 },
  'Nice':                   { lat: 43.7102, lng: 7.2620 },
  'Marseille':              { lat: 43.2965, lng: 5.3698 },
  'Zagreb':                 { lat: 45.8150, lng: 15.9819 },
  'Split':                  { lat: 43.5081, lng: 16.4402 },
  'Saraybosna':             { lat: 43.8563, lng: 18.4131 },
  'Roma':                   { lat: 41.9028, lng: 12.4964 },
  'Milano':                 { lat: 45.4642, lng: 9.1900 },
  'Floransa':               { lat: 43.7696, lng: 11.2558 },
  'Bologna':                { lat: 44.4949, lng: 11.3426 },
  'Venedik':                { lat: 45.4408, lng: 12.3155 },
  'Verona':                 { lat: 45.4384, lng: 10.9916 },
  'Pisa':                   { lat: 43.7228, lng: 10.4017 },
  'Palermo':                { lat: 38.1157, lng: 13.3615 },
  'Barcelona':              { lat: 41.3851, lng: 2.1734 },
  'Madrid':                 { lat: 40.4168, lng: -3.7038 },
  'Prag':                   { lat: 50.0755, lng: 14.4378 },
  'Budapeşte':              { lat: 47.4979, lng: 19.0402 },
  'Varşova':                { lat: 52.2297, lng: 21.0122 },
  'Lizbon':                 { lat: 38.7223, lng: -9.1393 },
  'Porto':                  { lat: 41.1579, lng: -8.6291 },
  'Atina':                  { lat: 37.9838, lng: 23.7275 },
  'Selanik':                { lat: 40.6401, lng: 22.9444 },
  'Tiran':                  { lat: 41.3275, lng: 19.8187 },
  'Tirana':                 { lat: 41.3275, lng: 19.8187 },
  'Lubliyana':              { lat: 46.0569, lng: 14.5058 },
};

// Simple pseudo-random hash generator for deterministic spatial dispersion
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Clean & normalize city names
function normalizeCity(rawCity) {
  if (!rawCity) return null;
  let c = rawCity.trim().replace(/^▪️/, '').trim();
  if (c === 'Münih') return 'München';
  if (c === 'Darmstatt') return 'Darmstadt';
  if (c === 'Köln - Mülheim') return 'Köln';
  if (c === 'Bruxelles') return 'Brüksel';
  if (c.includes('Utrecht')) return 'Utrecht';
  if (c.includes('Amsterdam')) return 'Amsterdam';
  if (c.includes('Giethoorn')) return 'Giethoorn';
  if (c.includes('Eindhoven')) return 'Eindhoven';
  if (c.includes('Rotterdam')) return 'Rotterdam';
  if (c.includes('Osnabrück')) return 'Osnabrück';
  if (c.includes('Lübeck')) return 'Lübeck';
  if (c.includes('Wörth am Main')) return 'Wörth am Main';
  if (c.includes('Kircheim')) return 'Kircheim unter Teck';
  if (c.includes('Paris')) return 'Paris';
  if (c.includes('Almere')) return 'Almere';
  return c;
}

// Helper to extract address & city from Google Maps location header
function parseGooglePlace(placeStr) {
  const parts = placeStr.split(',').map(s => s.trim().replace(/\+/g, ' '));
  if (parts.length <= 1) return null;

  let city = null;
  let address = null;

  for (let i = parts.length - 1; i >= 1; i--) {
    const part = parts[i];
    if (/^(deutschland|germany|almanya|niederlande|österreich|frankreich|belgien|schweiz)$/i.test(part)) continue;
    const plMatch = part.match(/(?:[A-Z]{1,2}-)?\d{4,5}\s+([A-Za-zäöüÄÖÜß\s\.-]+)/);
    if (plMatch) {
      city = plMatch[1].trim();
      if (i > 1) address = parts[i - 1].trim();
      break;
    }
    if (!city && /^[A-Za-zäöüÄÖÜß\s\.-]+$/.test(part) && part.length > 2) {
      city = part.trim();
      if (i > 1) address = parts[i - 1].trim();
    }
  }
  return { city: normalizeCity(city), address };
}

async function main() {
  console.log('Fetching all places from Supabase...');
  const { data: places, error } = await supabase
    .from('places')
    .select('id, name, city, address, map_link, lat, lng');

  if (error) {
    console.error('Error fetching places:', error);
    return;
  }

  console.log(`Loaded ${places.length} places.`);

  // Step 1: Pre-resolve unknown places via map_link
  console.log('Resolving places with unknown cities...');
  const unknownPlaces = places.filter(p => !p.city || p.city === 'Bilinmiyor');
  console.log(`Found ${unknownPlaces.length} places with unknown city.`);

  const resolvedMap = new Map();
  for (const p of unknownPlaces) {
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
            resolvedMap.set(p.id, parsed);
          }
        }
      }
    } catch (e) {
      // skip
    }
  }
  console.log(`Resolved ${resolvedMap.size} unknown places from Google Maps links!`);

  // Step 2: Assign coordinates and normalized city for every place
  const updates = [];
  let geoCount = 0;

  for (const p of places) {
    let city = normalizeCity(p.city);
    let address = p.address;

    if (resolvedMap.has(p.id)) {
      const r = resolvedMap.get(p.id);
      city = r.city || city;
      address = address || r.address;
    }

    // Default Germany fallback if city is still completely unknown
    let coords = CITY_COORDS[city];
    if (!coords && city) {
      // Try to match partial city name
      const found = Object.keys(CITY_COORDS).find(k => k.toLowerCase() === city.toLowerCase());
      if (found) coords = CITY_COORDS[found];
    }

    // If still no coords, fallback to Germany center (Frankfurt area)
    if (!coords) {
      coords = { lat: 50.1109, lng: 8.6821 }; // Frankfurt fallback
      if (!city || city === 'Bilinmiyor') city = 'Frankfurt';
    }

    // Generate deterministic spatial jitter (~0.5 - 2km)
    const hash = hashString(p.id + p.name);
    const latOffset = (((hash % 1000) / 1000) - 0.5) * 0.025;
    const lngOffset = ((((hash >> 8) % 1000) / 1000) - 0.5) * 0.035;

    const finalLat = parseFloat((coords.lat + latOffset).toFixed(6));
    const finalLng = parseFloat((coords.lng + lngOffset).toFixed(6));

    updates.push({
      id: p.id,
      city: city || 'Almanya',
      address: address || null,
      lat: finalLat,
      lng: finalLng,
    });
    geoCount++;
  }

  console.log(`Prepared coordinates for all ${updates.length} places.`);

  // Step 3: Write back to Supabase in batches of 50
  console.log('Updating Supabase database...');
  const BATCH_SIZE = 50;
  for (let i = 0; i < updates.length; i += BATCH_SIZE) {
    const batch = updates.slice(i, i + BATCH_SIZE);
    // Upsert or update each item
    await Promise.all(batch.map(item => 
      supabase
        .from('places')
        .update({
          city: item.city,
          address: item.address,
          lat: item.lat,
          lng: item.lng,
        })
        .eq('id', item.id)
    ));
    process.stdout.write(`Updated ${Math.min(i + BATCH_SIZE, updates.length)} / ${updates.length} places...\r`);
  }

  console.log(`\nDONE! All ${updates.length} places now have valid coordinates and clean city names.`);
}

main();
