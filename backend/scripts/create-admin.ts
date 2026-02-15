import { DataSource } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'mosala',
  entities: [User],
  synchronize: false,
});

async function createAdmin() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(User);
  const email = 'admin@mosala.com';
  const password = 'motdepassefort';
  const name = 'Admin Mosala';
  const existing = await repo.findOneBy({ email });
  if (existing) {
    console.log('Un administrateur existe déjà avec cet email.');
    process.exit(0);
  }
  const hashed = await bcrypt.hash(password, 10);
  const admin = repo.create({ name, email, password: hashed, role: 'admin' });
  await repo.save(admin);
  console.log('Administrateur créé avec succès:', email);
  process.exit(0);
}

createAdmin(); 