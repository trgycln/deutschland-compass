
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing env vars");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
    console.log("Testing fetch for 'professions'...");
    const { data, error } = await supabase
        .from('professions')
        .select('*')
        .limit(1);

    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Success:", data);
    }
}

testFetch();
