const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Initialiser client Supabase
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * POST /api/admins/create
 * Crée un nouvel administrateur avec un utilisateur Supabase Auth
 */
router.post('/create', async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    // Validation
    if (!full_name || !email || !password || !role) {
      return res.status(400).json({
        error: 'Missing required fields: full_name, email, password, role',
      });
    }

    // Vérifier que l'email n'existe pas déjà
    const { data: existingUser, error: existingError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({
        error: 'User with this email already exists',
      });
    }

    // Créer l'utilisateur Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      console.error('Auth error:', authError);
      return res.status(400).json({
        error: authError.message || 'Failed to create auth user',
      });
    }

    // Créer le profil dans profiles
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          full_name,
          email,
          role,
          is_active: true,
        },
      ])
      .select('id, full_name, email, role, is_active, created_at, updated_at')
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
      // Essayer de supprimer l'utilisateur auth créé
      await supabase.auth.admin.deleteUser(authData.user.id);
      return res.status(400).json({
        error: profileError.message || 'Failed to create profile',
      });
    }

    return res.status(201).json({
      admin: {
        id: profileData.id,
        full_name: profileData.full_name,
        email: profileData.email,
        role: profileData.role,
        is_active: profileData.is_active,
        created_at: profileData.created_at,
        updated_at: profileData.updated_at,
      },
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

module.exports = router;
