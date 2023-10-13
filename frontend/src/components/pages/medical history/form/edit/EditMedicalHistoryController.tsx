import { Container } from '@mui/material';
import { AviForm, useAviForm } from 'avi-form';
import { medicalHistoryFields } from '../MedicalHistoryForm';
import { useTranslation } from 'react-i18next';
import {
  useGetMedicalHistoryByIdQuery,
  useUpdateMedicalHistoryMutation,
} from '../../../../../redux/medicalSlice';
import Loader from '../../../../global/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uiSlice } from '../../../../../redux/uiSlice';
import { MedicalTypeTranslation } from '../../../../../types/translation/MedicalTypeTranslation';

export const EditMedicalHistoryController: React.FC = memo(() => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: medicalHistoryData,
    isSuccess: medicalHistoryIsSuccess,
    isLoading: medicalHistoryIsLoading,
    // isError: medicalHisoryIsError,
  } = useGetMedicalHistoryByIdQuery(id || '');

  const [
    updateMedicalHistory,
    {
      isLoading: isUpdatingMedicalHistory,
      // isError: isUpdatingMedicalHistoryError,
      isSuccess: isUpdatingMedicalHistorySuccess,
    },
  ] = useUpdateMedicalHistoryMutation();

  const INIT_VALUES = {
    ...medicalHistoryData,
    medicalType: {
      label: medicalHistoryData?.medicalType,
      value: medicalHistoryData?.medicalType,
    },
    severity: {
      label: t(
        `medicalHistoryForm.medicalSeverityOptions.${medicalHistoryData?.severity}`
      ),
      value: medicalHistoryData?.severity,
    },
  };
  const medicalTypeOptions: MedicalTypeTranslation = t('medicalTypeOptions', {
    returnObjects: true,
  });
  useEffect(() => {
    dispatch(
      uiSlice.actions.setBreadcrumbNoPrflx(
        `${medicalTypeOptions[medicalHistoryData?.medicalType || '']} - ${
          medicalHistoryData?.medicalDescription
        }`
      )
    );
    return () => {
      dispatch(uiSlice.actions.resetBreadcrumb());
    };
  }, [
    dispatch,
    medicalHistoryData?.medicalDescription,
    medicalHistoryData?.medicalType,
    medicalTypeOptions,
  ]);

  useEffect(() => {
    if (isUpdatingMedicalHistorySuccess) {
      navigate(`/medical-history/${id}`);
    }
  }, [id, isUpdatingMedicalHistorySuccess, navigate]);

  const { formProps } = useAviForm({
    fields: medicalHistoryFields(t),
    onSubmit: async (values) => {
      values.medicalType = values.medicalType.value;
      values.severity = values.severity.value;
      await updateMedicalHistory({
        body: values,
        id: id || '',
      });
    },
  });

  const isLoading = medicalHistoryIsLoading || isUpdatingMedicalHistory;

  if (medicalHistoryIsSuccess) {
    formProps.initValues = INIT_VALUES;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: '3rem',
        marginBottom: '1rem',
      }}
    >
      {isLoading && <Loader />}
      {medicalHistoryIsSuccess && <AviForm formProps={formProps} />}
    </Container>
  );
});
