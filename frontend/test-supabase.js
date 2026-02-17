import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ikugkkubbyoohfpqcoum.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrdWdra3ViYnlvb2hmcHFjb3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NDI3MTUsImV4cCI6MjA4NjIxODcxNX0.VibPKlcZpsAGSx756xja3TUfAtWFwq8phENXE9RTIe'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testSupabaseConnection() {
  console.log('🧪 Test de connexion Supabase...\n')

  try {
    console.log('✅ Client Supabase créé')
    console.log(`   URL: ${supabaseUrl}`)
    console.log(`   Clé: ${supabaseAnonKey.substring(0, 20)}...\n`)

    // Test 1: Lister les tables
    console.log('📋 Test 1: Vérification des tables...')
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1)

    if (error) {
      console.log('❌ Erreur lors de la lecture de la table users:')
      console.log(`   ${error.message}`)
      return false
    }

    console.log('✅ Table "users" accessible')
    console.log(`   Nombre de colonnes: ${data ? Object.keys(data[0] || {}).length : 0}\n`)

    // Test 2: Vérifier si un admin existe
    console.log('👤 Test 2: Recherche d\'utilisateur admin...')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'superadmin')

    if (usersError) {
      console.log('❌ Erreur lors de la recherche:')
      console.log(`   ${usersError.message}`)
      return false
    }

    if (users && users.length > 0) {
      console.log(`✅ ${users.length} administrateur(s) trouvé(s):`)
      users.forEach(user => {
        console.log(`   - ${user.email} (${user.role})`)
      })
    } else {
      console.log('⚠️  Aucun superadmin trouvé en base de données')
      console.log('   Action requise: Créer un utilisateur superadmin')
    }

    return true
  } catch (error) {
    console.log('❌ Erreur de connexion à Supabase:')
    console.log(`   ${error instanceof Error ? error.message : error}`)
    return false
  }
}

// Exécuter le test
testSupabaseConnection().then(success => {
  console.log('\n' + (success ? '✅ Supabase est fonctionnel' : '❌ Problèmes détectés avec Supabase'))
})
