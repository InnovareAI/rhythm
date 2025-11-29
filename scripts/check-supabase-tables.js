import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load .env.local
const envPath = join(process.cwd(), '.env.local')
const envContent = readFileSync(envPath, 'utf-8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkTables() {
  console.log('🔍 Checking Supabase database schema...\n')
  console.log(`Project: ${supabaseUrl}\n`)

  // Check for conversations table
  console.log('📋 Checking table: conversations')
  const { data: convData, error: convError } = await supabase
    .from('conversations')
    .select('*')
    .limit(1)

  if (convError) {
    console.log(`   ❌ Table not found or error: ${convError.message}`)
  } else {
    console.log(`   ✅ Table exists`)
    const { count } = await supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true })
    console.log(`   📊 Row count: ${count}`)
  }

  // Check for messages table
  console.log('\n📋 Checking table: messages')
  const { data: msgData, error: msgError } = await supabase
    .from('messages')
    .select('*')
    .limit(1)

  if (msgError) {
    console.log(`   ❌ Table not found or error: ${msgError.message}`)
  } else {
    console.log(`   ✅ Table exists`)
    const { count } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
    console.log(`   📊 Row count: ${count}`)
  }

  // Check for generated_content table
  console.log('\n📋 Checking table: generated_content')
  const { data: genData, error: genError } = await supabase
    .from('generated_content')
    .select('*')
    .limit(1)

  if (genError) {
    console.log(`   ❌ Table not found or error: ${genError.message}`)
  } else {
    console.log(`   ✅ Table exists`)
    const { count } = await supabase
      .from('generated_content')
      .select('*', { count: 'exact', head: true })
    console.log(`   📊 Row count: ${count}`)
  }

  // List all tables using PostgreSQL query
  console.log('\n📊 All tables in public schema:')
  const { data: tables, error: tablesError } = await supabase.rpc('get_tables')

  if (tablesError) {
    console.log('   ℹ️  Cannot query schema (RPC not available)')
    console.log('   Using direct table checks instead')
  } else {
    console.log(tables)
  }
}

checkTables().catch(console.error)
