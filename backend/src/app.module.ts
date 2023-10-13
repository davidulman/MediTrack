import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MedicalModule } from './medical/medical.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule, MedicalModule],
})
export class AppModule {}
