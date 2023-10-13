import { memo } from 'react';
import { useGetMedicalHistoryQuery } from '../../../redux/medicalSlice';
import { CardGen } from '../../global/components/card/CardGen';
import Loader from '../../global/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { Box, Tooltip } from '@mui/material';
import {
  MedicalTypeTranslation,
  SeverityTypeTranslation,
} from '../../../types/translation/MedicalTypeTranslation';
import { DateRange, PriorityHigh } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ToggleComp } from '../../global/components/toggle.tsx/Toggle';
import { TOGGLE_VALUES_MEDICAL_HISTORY } from '../../global/config/toogleConfig';
import { MedicalTypeEnum } from './enums/MedicalType';
import { uiSlice } from '../../../redux/uiSlice';
import { NoItemsFound } from '../../global/notfound/NoItemsFound';

export const MedicalHistoryViewer: React.FC = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (s: RootState) => s.Ui.language.currentLanguage
  );
  const currentView = useSelector(
    (s: RootState) => s.Ui.medicalHistory.currentView
  );
  const {
    data: medicalData,
    isLoading: medicalIsLoading,
    isSuccess: medicalIsSuccess,
  } = useGetMedicalHistoryQuery();

  const medicalTypeOptions: MedicalTypeTranslation = t('medicalTypeOptions', {
    returnObjects: true,
  });

  const severityTypeOptions: SeverityTypeTranslation = t(
    'medicalSeverityOptions',
    {
      returnObjects: true,
    }
  );

  const medicalViewChangeHandler = (
    _e: React.ChangeEvent<HTMLInputElement>,
    newVal: MedicalTypeEnum
  ) => {
    if (newVal === null) return;
    dispatch(uiSlice.actions.setMedicalHistoryView(newVal));
  };

  const filteredMedicalData = medicalData?.filter(
    (d) => d.medicalType === currentView
  );

  const matchNoItems = medicalIsSuccess && filteredMedicalData?.length === 0;

  return (
    <>
      {medicalIsLoading && <Loader />}

      <Box
        sx={{
          marginTop: '2rem',
        }}
      >
        <ToggleComp
          values={TOGGLE_VALUES_MEDICAL_HISTORY(medicalTypeOptions)}
          currentObj={currentView}
          handleChange={medicalViewChangeHandler as never}
        />
      </Box>

      <Box
        key={currentView}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          marginTop: '1rem',
          rowGap: '2rem',
          columnGap: '1.5rem',
          p: '1.5rem',
        }}
      >
        {matchNoItems && <NoItemsFound />}

        {filteredMedicalData?.map((m) => (
          <>
            <CardGen
              key={m._id}
              dataProps={{
                id: m._id,
                title: medicalTypeOptions[m.medicalType],
                titleTooltip: `${medicalTypeOptions[m.medicalType]} - ${
                  m.medicalDescription
                }`,
                otherLocation: '/medical-history',
                maxWidth: 600,
                secondText: (
                  <>
                    <Box
                      key={m._id}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        rowGap: '1rem',
                        columnGap: '1.3rem',
                        marginTop: '1.2rem',
                      }}
                    >
                      {m.severity && (
                        <Tooltip title={t('medicalHistoryForm.severity')} arrow>
                          <Box
                            key={m._id}
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: '0.5rem',
                            }}
                          >
                            <PriorityHigh />
                            <strong>{severityTypeOptions[m.severity]}</strong>
                          </Box>
                        </Tooltip>
                      )}

                      {m.startDate && m.endDate && (
                        <Tooltip
                          title={`${t('medicalHistoryForm.startDate')} - ${t(
                            'medicalHistoryForm.endDate'
                          )}`}
                          arrow
                        >
                          <Box
                            key={m._id}
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: '0.3rem',
                            }}
                          >
                            <DateRange />
                            <strong>
                              {`${new Date(m.startDate).toLocaleDateString(
                                currentLanguage
                              )} - ${new Date(m.endDate).toLocaleDateString(
                                currentLanguage
                              )}`}
                            </strong>
                          </Box>
                        </Tooltip>
                      )}
                    </Box>
                  </>
                ),
              }}
            />
          </>
        ))}
      </Box>
    </>
  );
});
