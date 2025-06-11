/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DataSource } from 'typeorm';
import { Patient } from '../patients/patients.entity';
import { Provider } from '../providers/providers.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Patient, Provider],
  synchronize: true,
});

async function seed() {
  let queryRunner;
  try {
    await AppDataSource.initialize();
    queryRunner = AppDataSource.createQueryRunner();

    console.log('🗑️ Dropping existing tables (via raw SQL)...');

    await queryRunner.query('DROP TABLE IF EXISTS "patients" CASCADE;');
    await queryRunner.query('DROP TABLE IF EXISTS "providers" CASCADE;');
    console.log('✅ Tables dropped.');

    console.log('✨ Synchronizing schema to recreate tables...');
    await AppDataSource.synchronize();
    console.log('✅ Schema synchronized.');

    const patientRepo = AppDataSource.getRepository(Patient);
    const providerRepo = AppDataSource.getRepository(Provider);

    await patientRepo.insert([
      {
        health_card_number: '1234567890',
        name: 'John Doe',
        DOB: new Date('1980-01-01'),
        sex: 'M',
        phone: '4161234567',
        email: 'john@example.com',
        address: '123 Bay St, Toronto',
      },
    ]);

    await providerRepo.insert([
      {
        provider_id: 'P1001',
        name: 'Dr. Jane Smith',
        specialty: 'General Practice',
        registration_number: 'REG123456',
      },
    ]);

    console.log('✅ Patients and providers seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:');
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      if (queryRunner) {
        await queryRunner.release();
      }
      await AppDataSource.destroy();
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
seed();
