import { Container } from '@mui/material';
import { AviForm, useAviForm } from 'avi-form';
import { medicalHistoryFields } from '../MedicalHistoryForm';
import { useTranslation } from 'react-i18next';
import { useAddMedicalHistoryMutation } from '../../../../../redux/medicalSlice';
import Loader from '../../../../global/Loader/Loader';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateMedicalHistoryController: React.FC = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [
    createMedicalHistory,
    {
      isLoading: isCreatingMedicalHistory,
      // isError: isCreatingMedicalHistoryError,
      isSuccess: isCreatingMedicalHistorySuccess,
    },
  ] = useAddMedicalHistoryMutation();

  useEffect(() => {
    if (isCreatingMedicalHistorySuccess) {
      navigate('/medical-history');
    }
  }, [isCreatingMedicalHistorySuccess, navigate]);

  const { formProps } = useAviForm({
    fields: medicalHistoryFields(t),
    onSubmit: async (values) => {
      values.medicalType = values.medicalType.value;
      values.severity = values.severity.value;
      await createMedicalHistory(values);
    },
  });

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: '3rem',
        marginBottom: '1rem',
      }}
    >
      {isCreatingMedicalHistory && <Loader />}
      <AviForm formProps={formProps} />
    </Container>
  );
});
