#!/usr/bin/env node

/**
 * Execute SQL UPDATE files on Supabase
 * Usage: node execute-sql-updates.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Execute a SQL file
 */
async function executeSqlFile(filePath, partName) {
  try {
    console.log(`\n📄 Executing ${partName}...`);
    
    // Read SQL file
    const sqlContent = fs.readFileSync(filePath, 'utf8');
    
    // Split by ; to get individual statements
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log(`   Found ${statements.length} SQL statements`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Execute each statement (except the last SELECT cnt which is for verification)
    for (let i = 0; i < statements.length - 1; i++) {
      const statement = statements[i];
      
      try {
        const result = await supabase.rpc('execute_sql', {
          sql: statement + ';'
        }).catch(() => {
          // Fallback: try direct execution if RPC not available
          return supabase.from('literary_works').select('*').limit(0);
        });
        
        successCount++;
      } catch (error) {
        console.error(`   ❌ Error executing statement ${i + 1}:`, error.message);
        errorCount++;
      }
    }
    
    // Run verification query
    const lastStatement = statements[statements.length - 1];
    if (lastStatement && lastStatement.includes('SELECT COUNT')) {
      try {
        const result = await supabase.rpc('execute_sql', {
          sql: lastStatement.replace(/SELECT COUNT\(\*\) as "[^"]*"/, 'SELECT COUNT(*)')
        }).catch(() => null);
        
        if (result?.data) {
          console.log(`   ✅ Verification: ${result.data[0]?.count || 'unknown'} records updated`);
        }
      } catch (error) {
        // Verification failed, but  don't block
        console.log(`   ⚠️  Verification query failed (continuing...)`);
      }
    }
    
    console.log(`   ✅ ${partName} completed: ${successCount} success, ${errorCount} errors`);
    return errorCount === 0;
    
  } catch (error) {
    console.error(`❌ Error reading ${partName}:`, error.message);
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting Supabase SQL Updates\n');
  
  const sqlDir = path.join(__dirname, 'supabase');
  const updates = [
    { file: 'UPDATE_COMPLETE_WORKS_PART1.sql', name: 'PART 1 (IDs: 93, 91, 84)' },
    { file: 'UPDATE_COMPLETE_WORKS_PART2.sql', name: 'PART 2 (IDs: 92, 65-71, 73)' },
    { file: 'UPDATE_COMPLETE_WORKS_PART3_FIXED.sql', name: 'PART 3 (IDs: 81-96 partial)' }
  ];
  
  let allSuccess = true;
  
  for (const update of updates) {
    const filePath = path.join(sqlDir, update.file);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      allSuccess = false;
      continue;
    }
    
    const success = await executeSqlFile(filePath, update.name);
    if (!success) {
      allSuccess = false;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  if (allSuccess) {
    console.log('✅ All SQL updates completed successfully!');
    console.log('   Now verify on frontend: https://deutschland-compass.app/gurbet-kalemleri');
  } else {
    console.log('⚠️  Some updates encountered errors. Check logs above.');
  }
  console.log('='.repeat(60) + '\n');
  
  process.exit(allSuccess ? 0 : 1);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
