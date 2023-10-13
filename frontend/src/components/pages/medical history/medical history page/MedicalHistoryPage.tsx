import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteMedicalHistoryMutation,
  useGetMedicalHistoryByIdQuery,
} from '../../../../redux/medicalSlice';
import Loader from '../../../global/Loader/Loader';
import { MedicalToolBar } from './widget/MedicalToolBar';
import { useTranslation } from 'react-i18next';
import { Box, Container } from '@mui/material';
import { MedicalInformationCards } from './widget/MedicalInformationCards';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { MedicalActions } from './widget/MedicalActions';
import { useEffect } from 'react';
import { uiSlice } from '../../../../redux/uiSlice';
import { MedicalTypeTranslation } from '../../../../types/translation/MedicalTypeTranslation';

export const MedicalHistoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [
    deleteMedicalHistory,
    { isLoading: deleteIsLoading, isSuccess: deleteIsSuccess },
  ] = useDeleteMedicalHistoryMutation();

  const {
    data: medicalHistoryData,
    isLoading: medicalHistoryIsLoading,
    isSuccess: medicalHistoryIsSuccess,
  } = useGetMedicalHistoryByIdQuery(id || '');

  const medicalTypeOptions: MedicalTypeTranslation = t('medicalTypeOptions', {
    returnObjects: true,
  });

  const currentLanguage = useSelector(
    (s: RootState) => s.Ui.language.currentLanguage
  );

  const deleteHandler = async () => {
    await deleteMedicalHistory(id);
    navigate('../');
  };

  useEffect(() => {
    dispatch(
      uiSlice.actions.setBreadcrumb(
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

  const isLoading = deleteIsLoading || medicalHistoryIsLoading;

  return (
    <Container
      maxWidth="xl"
      sx={{
        gap: '1rem',
        mt: '3rem',
        mb: '1rem',
      }}
    >
      {isLoading && <Loader />}
      {medicalHistoryIsSuccess && (
        <>
          <MedicalToolBar medicalData={medicalHistoryData} t={t} />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '1rem',
              mt: '4rem',
            }}
          >
            <MedicalInformationCards
              medicalData={medicalHistoryData}
              currentLanguage={currentLanguage}
              t={t}
            />

            <MedicalActions
              deleteFunc={deleteHandler}
              isSuccess={deleteIsSuccess}
              t={t}
            />
          </Box>
        </>
      )}
    </Container>
  );
};
