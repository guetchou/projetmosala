const { Client } = require('pg');
const faker = require('faker');

const DB_URL = process.env.DB_URL || 'postgres://user:pass@localhost:5432/db';
const client = new Client({ connectionString: DB_URL });

async function main() {
  await client.connect();
  // Générer 20 utilisateurs
  for (let i = 0; i < 20; i++) {
    await client.query(
      'INSERT INTO demo.users (name, email) VALUES ($1, $2)',
      [faker.name.findName(), faker.internet.email()]
    );
  }
  // Générer 10 jobs
  for (let i = 0; i < 10; i++) {
    await client.query(
      'INSERT INTO demo.jobs (title, company, location, type) VALUES ($1, $2, $3, $4)',
      [faker.name.jobTitle(), faker.company.companyName(), faker.address.city(), faker.random.arrayElement(['CDI','CDD','Stage','Alternance'])]
    );
  }
  // Générer 30 candidatures
  for (let i = 0; i < 30; i++) {
    await client.query(
      'INSERT INTO demo.applications (user_id, job_id, status) VALUES ($1, $2, $3)',
      [faker.datatype.number({min:1,max:20}), faker.datatype.number({min:1,max:10}), faker.random.arrayElement(['en attente','acceptée','refusée'])]
    );
  }
  await client.end();
  console.log('Données de démo insérées.');
}

main(); 