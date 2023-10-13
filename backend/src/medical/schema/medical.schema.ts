import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MedicalHistoryEnum } from '../enums/medical.enum';
import { SeverityEnum } from '../enums/severity.enum';
import { Auth } from 'src/auth/schema/auth.schema';
import mongoose, { Document } from 'mongoose';

export type MedicalDocument = Medical & Document;

@Schema()
export class Medical {
  @Prop({ required: true, enum: Object.values(MedicalHistoryEnum) })
  medicalType: MedicalHistoryEnum;

  @Prop({ required: true })
  medicalDescription: string;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;

  @Prop()
  attachments?: string[];

  @Prop()
  notes?: string;

  @Prop({ enum: Object.values(SeverityEnum), required: false })
  severity?: SeverityEnum;

  @Prop()
  doctorName?: string;

  @Prop()
  hospitalName?: string;

  @Prop()
  shareToken?: string;

  @Prop()
  isShared?: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({
    required: true,
    ref: Auth.name,
    type: mongoose.Schema.Types.ObjectId,
  })
  user: Auth;
}

export const MedicalSchema = SchemaFactory.createForClass(Medical);
