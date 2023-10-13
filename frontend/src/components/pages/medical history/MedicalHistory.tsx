import { useNavigate } from 'react-router-dom';
import { MedicalHistoryViewer } from './MedicalHistoryViewer';
import { SpeedDialComp } from '../../global/components/speed dial/SpeedDialComp';
import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';

export const MedicalHistory: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const speedDialActions = [
    {
      icon: <Add />,
      name: t('medicalHistoryForm.createNewHistory'),
      handler: () => navigate('/medical-history/create'),
    },
  ];
  return (
    <>
      <MedicalHistoryViewer />
      <SpeedDialComp config={speedDialActions} />
    </>
  );
};
