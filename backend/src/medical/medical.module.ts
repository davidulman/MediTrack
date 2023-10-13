import { Module } from '@nestjs/common';
import { MedicalService } from './medical.service';
import { MedicalController } from './medical.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Medical, MedicalSchema } from './schema/medical.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Medical.name, schema: MedicalSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SHARE_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME },
    }),
  ],
  controllers: [MedicalController],
  providers: [MedicalService],
})
export class MedicalModule {}
