import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsModule } from './patients/patients.module';
import { ProvidersModule } from './providers/providers.module';
import { EncountersModule } from './encounters/encounter.module';
import { BillingModule } from './billing/billing.module';
import { FeeScheduleModule } from './feeschedule/feeschedule.module';
import { AuditModule } from './auth/audit.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    PatientsModule,
    ProvidersModule,
    EncountersModule,
    BillingModule,
    FeeScheduleModule,
    AuditModule,
    AuthModule,
  ],
})
export class AppModule {}
