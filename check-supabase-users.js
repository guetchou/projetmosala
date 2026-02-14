#!/usr/bin/env node
/**
 * Script pour vérifier les utilisateurs dans Supabase
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SUPABASE_URL = 'https://ikugkkubbyoohfpqcoum.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrdWdra3ViYnlvb2hmcHFjb3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NDI3MTUsImV4cCI6MjA4NjIxODcxNX0.VibPKlcZpsAGSx756xja3TUfAtWFwq8phENXE9RTIeU';

async function listUsers() {
  try {
    console.log('🔍 Vérification des utilisateurs dans Supabase...\n');
    
    // Essayer de se connecter avec un utilisateur test
    const testEmail = 'test@mosala.com';
    const testPassword = 'Test123456';
    
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });

    const data = await response.json();
    
    if (response.ok && data.user) {
      console.log('✅ Utilisateur trouvé:');
      console.log(`   Email: ${data.user.email}`);
      console.log(`   ID: ${data.user.id}`);
      console.log(`   User Metadata:`, JSON.stringify(data.user.user_metadata, null, 2));
      console.log(`   App Metadata:`, JSON.stringify(data.user.app_metadata, null, 2));
    } else {
      console.log('❌ Utilisateur non trouvé ou identifiants incorrects');
      if (data.error) {
        console.log(`   Erreur: ${data.error}`);
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message);
  }
}

async function createTestUser() {
  try {
    console.log('📝 Création d\'un utilisateur test...\n');
    
    const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        email: 'superadmin@test.com',
        password: 'SuperAdmin123456',
        data: {
          role: 'superadmin',
          name: 'Super Admin Test',
        },
      }),
    });

    const data = await response.json();
    
    if (response.ok && data.user) {
      console.log('✅ Utilisateur créé avec succès:');
      console.log(`   Email: ${data.user.email}`);
      console.log(`   ID: ${data.user.id}`);
      console.log(`   Métadonnées:`, JSON.stringify(data.user.user_metadata, null, 2));
    } else {
      console.log('❌ Erreur lors de la création:');
      if (data.error) {
        console.log(`   ${data.error}`);
      }
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════');
  console.log('   VÉRIFICATEUR SUPABASE - Utilisateurs & Rôles');
  console.log('═══════════════════════════════════════════════\n');
  
  // Vérifier un utilisateur existant
  await listUsers();
  
  console.log('\n═══════════════════════════════════════════════\n');
  
  // Créer un utilisateur test
  await createTestUser();
}

main();
