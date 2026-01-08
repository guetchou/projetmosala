const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DB_URL });

// Utilitaire pour exécuter une requête avec le bon search_path
async function queryWithSchema(req, sql, params) {
  const client = await pool.connect();
  try {
    if (req && req.pgSearchPath) {
      await client.query(`SET search_path TO ${req.pgSearchPath}`);
    }
    const result = await client.query(sql, params);
    return result;
  } finally {
    client.release();
  }
}

module.exports = { pool, queryWithSchema }; 