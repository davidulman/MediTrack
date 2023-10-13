import { MedicalTypeEnum } from '../../components/pages/medical history/enums/MedicalType';
import { SeverityEnum } from '../../components/pages/medical history/enums/Severity';

export interface MedicalHistoryQuery {
  _id: string;
  medicalType: MedicalTypeEnum;
  medicalDescription: string;
  startDate?: Date;
  endDate?: Date;
  attachments?: string[];
  notes?: string;
  severity?: SeverityEnum;
  doctorName?: string;
  isShared?: boolean;
  hospitalName?: string;
  createdAt: Date;
  __v: number | string;
}
