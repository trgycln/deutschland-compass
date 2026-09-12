const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function seedReviews() {
  console.log('Fetching places with existing notes...');
  const { data: places, error } = await supabase
    .from('places')
    .select('id, name, city, note, created_at')
    .not('note', 'is', null);

  if (error) {
    console.error('Error fetching places:', error);
    return;
  }

  console.log(`Found ${places.length} places with notes.`);

  // First check if reviews already exist
  const { data: existingReviews } = await supabase.from('place_reviews').select('place_id');
  const existingPlaceIds = new Set((existingReviews || []).map(r => r.place_id));

  const reviewsToInsert = [];
  const placesToUpdate = [];

  for (const p of places) {
    if (!p.note || !p.note.trim()) continue;
    if (existingPlaceIds.has(p.id)) continue;

    reviewsToInsert.push({
      place_id: p.id,
      reviewer_name: 'Telegram Topluluk Paylaşımı',
      rating: 5,
      comment: p.note.trim(),
      source: 'telegram',
      verified: true,
      created_at: p.created_at || new Date().toISOString()
    });

    placesToUpdate.push(p.id);
  }

  console.log(`Inserting ${reviewsToInsert.length} reviews from notes...`);

  // Insert in batches of 50
  const BATCH_SIZE = 50;
  for (let i = 0; i < reviewsToInsert.length; i += BATCH_SIZE) {
    const batch = reviewsToInsert.slice(i, i + BATCH_SIZE);
    const { error: insErr } = await supabase.from('place_reviews').insert(batch);
    if (insErr) {
      console.error('Insert error at batch', i, insErr);
    }
  }

  // Update rating_avg and rating_count on places
  console.log('Updating rating stats on places...');
  for (let i = 0; i < placesToUpdate.length; i += BATCH_SIZE) {
    const batch = placesToUpdate.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(id => 
      supabase.from('places').update({ rating_avg: 5.0, rating_count: 1 }).eq('id', id)
    ));
  }

  console.log('DONE! Successfully seeded reviews and updated place ratings.');
}

seedReviews();
