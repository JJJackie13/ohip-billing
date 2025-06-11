import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const FEE_SCHEDULE = [
  {
    code: 'A001',
    description: 'Minor Assessment',
    amount: 23.75,
  },
  {
    code: 'A002',
    description: 'General Assessment',
    amount: 62.2,
  },
  {
    code: 'A003',
    description: 'Comprehensive Basic Assessment',
    amount: 87.36,
  },
  {
    code: 'A004',
    description: 'Focused Practice Assessment',
    amount: 38.35,
  },
  {
    code: 'A005',
    description: 'Comprehensive Annual Care Plan (CACP) Visit',
    amount: 87.92,
  },
  {
    code: 'A006',
    description: 'General Re-assessment',
    amount: 45.9,
  },
  {
    code: 'A007',
    description: 'Intermediate Assessment',
    amount: 37.95,
  },
  {
    code: 'A008',
    description: 'Pre-natal visit',
    amount: 13.06,
  },
  {
    code: 'A010',
    description: 'Specialist Consultation',
    amount: 87.92,
  },
  {
    code: 'A011',
    description: 'Limited Consultation',
    amount: 45.9,
  },
  {
    code: 'A013',
    description: 'Repeat Consultation',
    amount: 64.65,
  },
];

async function run() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error('❌ MONGO_URI not found in .env file. Please set it.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);

    const FeeScheduleSchema = new mongoose.Schema({
      code: String,
      description: String,
      amount: Number,
    });

    const FeeScheduleModel = mongoose.model(
      'Fee',
      FeeScheduleSchema,
      'feeschedules',
    );

    await FeeScheduleModel.deleteMany({});
    await FeeScheduleModel.insertMany(FEE_SCHEDULE);

    console.log('✅ Fee schedule seeded');
  } catch (error) {
    console.error('❌ Fee schedule seeding failed:');
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

run().catch((err) => {
  console.error('❌ Error seeding fee schedule:', err);
});
