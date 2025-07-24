const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const { v4: uuidv4 } = require('uuid');

// GET /admin/demo/logs
router.get('/logs', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM demo.demo_audit_log ORDER BY created_at DESC LIMIT 100');
  res.json(rows);
});

// GET /admin/demo/scenarios
router.get('/scenarios', (req, res) => {
  res.json([
    { id: 1, name: 'Onboarding candidat', steps: 5 },
    { id: 2, name: 'Création offre recruteur', steps: 4 },
    { id: 3, name: 'Simulation candidature', steps: 3 }
  ]);
});

// POST /admin/demo/scenario/:id
router.post('/scenario/:id', async (req, res) => {
  // Simule le lancement d'un scénario guidé
  await pool.query(
    'INSERT INTO demo.demo_audit_log (user_id, method, path, body, created_at) VALUES ($1, $2, $3, $4, NOW())',
    [req.user ? req.user.id : null, 'POST', `/admin/demo/scenario/${req.params.id}`, JSON.stringify({ scenario: req.params.id })]
  );
  res.json({ demo: true, message: `Scénario ${req.params.id} lancé (simulation)` });
});

// POST /admin/demo/sandbox
router.post('/sandbox', async (req, res) => {
  const sandboxId = uuidv4().replace(/-/g, '').slice(0, 12);
  const schemaName = `demo_user_${sandboxId}`;
  // Clone structure from demo
  await pool.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
  await pool.query(`CREATE TABLE IF NOT EXISTS ${schemaName}.users (LIKE demo.users INCLUDING ALL)`);
  await pool.query(`CREATE TABLE IF NOT EXISTS ${schemaName}.jobs (LIKE demo.jobs INCLUDING ALL)`);
  await pool.query(`CREATE TABLE IF NOT EXISTS ${schemaName}.applications (LIKE demo.applications INCLUDING ALL)`);
  // Copy data
  await pool.query(`INSERT INTO ${schemaName}.users SELECT * FROM demo.users`);
  await pool.query(`INSERT INTO ${schemaName}.jobs SELECT * FROM demo.jobs`);
  await pool.query(`INSERT INTO ${schemaName}.applications SELECT * FROM demo.applications`);
  res.json({ sandbox: schemaName, token: sandboxId });
});

// DELETE /admin/demo/sandbox/:id
router.delete('/sandbox/:id', async (req, res) => {
  const schemaName = `demo_user_${req.params.id}`;
  await pool.query(`DROP SCHEMA IF EXISTS ${schemaName} CASCADE`);
  res.json({ deleted: schemaName });
});

module.exports = router; 