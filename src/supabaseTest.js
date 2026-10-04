import { supabase } from './supabase.js'

export async function testSupabaseConnection() {
  const { data, error } = await supabase
    .from('test_connection')
    .select('*')
    .limit(1)

  if (error) {
    console.error('❌ Supabase Error:', error.message)
    return
  }

  console.log('✅ Supabase Connected Successfully!')
  console.log('Data from Supabase:', data)
}