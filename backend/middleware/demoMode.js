const { Pool } = require('pg');

// Utilisation d'un pool PostgreSQL global
const pool = new Pool({ connectionString: process.env.DB_URL });

// Middleware DEMO
async function demoMode(req, res, next) {
  const isDemo = req.headers['x-demo-mode'] === 'true' || (req.user && req.user.demo === true);
  req.isDemo = isDemo;

  // Bascule search_path si DEMO
  if (isDemo) {
    req.pgSearchPath = 'demo';
  } else {
    req.pgSearchPath = 'public';
  }

  // Journalisation de toutes les requêtes DEMO
  if (isDemo) {
    await pool.query(
      'INSERT INTO demo.demo_audit_log (user_id, method, path, body, created_at) VALUES ($1, $2, $3, $4, NOW())',
      [req.user ? req.user.id : null, req.method, req.path, JSON.stringify(req.body)]
    );
  }

  // Mock mutations en DEMO (aucune écriture réelle)
  if (isDemo && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    // Simule le succès sans toucher à la prod
    return res.status(200).json({ demo: true, message: 'Action simulée en mode DÉMO. Aucune donnée réelle modifiée.' });
  }

  next();
}

module.exports = demoMode; 