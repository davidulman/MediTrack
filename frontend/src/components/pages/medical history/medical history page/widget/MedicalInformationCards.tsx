import { Box, Grid, Typography } from '@mui/material';
import { memo } from 'react';
import { StatisticCard } from '../../../../global/components/card/StatisticCard';
import { TFunction } from 'i18next';
import { MedicalHistoryQuery } from '../../../../../types/redux/MedicalHistoryQuery';
import { Event, PriorityHigh, Subject, Today } from '@mui/icons-material';
import { FaUserDoctor } from 'react-icons/fa6';
import { BsFillHospitalFill } from 'react-icons/bs';
import { SeverityTypeTranslation } from '../../../../../types/translation/MedicalTypeTranslation';

interface CardData {
  title: string;
  value: string;
  img: React.ReactNode;
  lg?: number;
  md?: number;
  xs?: number;
}

interface MedicalInformationCardsProps {
  medicalData: MedicalHistoryQuery;
  currentLanguage: string;
  t: TFunction;
}

export const MedicalInformationCards: React.FC<MedicalInformationCardsProps> =
  memo(({ medicalData, currentLanguage, t }) => {
    const severityTypeOptions: SeverityTypeTranslation = t(
      'medicalSeverityOptions',
      {
        returnObjects: true,
      }
    );
    const cardData: CardData[] = [
      ...(medicalData.startDate
        ? [
            {
              title: t('medicalHistoryForm.startDate'),
              value: new Date(medicalData.startDate).toLocaleDateString(
                currentLanguage
              ),
              img: <Today fontSize="large" />,
            },
          ]
        : []),

      ...(medicalData.endDate
        ? [
            {
              title: t('medicalHistoryForm.endDate'),
              value: new Date(medicalData.endDate).toLocaleDateString(
                currentLanguage
              ),
              img: <Event fontSize="large" />,
            },
          ]
        : []),

      ...(medicalData.severity
        ? [
            {
              title: t('medicalHistoryForm.severity'),
              value: severityTypeOptions[medicalData.severity],
              img: <PriorityHigh fontSize="large" />,
            },
          ]
        : []),

      ...(medicalData.notes
        ? [
            {
              title: t('medicalHistoryForm.notes'),
              value: medicalData.notes,
              img: <Subject fontSize="large" />,
            },
          ]
        : []),

      ...(medicalData.hospitalName
        ? [
            {
              title: t('medicalHistoryForm.hospitalName'),
              value: medicalData.hospitalName,
              img: <BsFillHospitalFill size="2rem" />,
            },
          ]
        : []),
      ...(medicalData.doctorName
        ? [
            {
              title: t('medicalHistoryForm.doctorName'),
              value: medicalData.doctorName,
              img: <FaUserDoctor size="2rem" />,
            },
          ]
        : []),
    ];

    return (
      <Grid
        container
        spacing={2}
        rowGap={1}
        sx={{
          border: 'none',
        }}
      >
        {cardData.map((c) => (
          <Grid
            item
            xs={c.xs || 12}
            md={c.md || 6}
            lg={c.lg || 4}
            key={c.title}
          >
            <StatisticCard
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: '1.5rem',
                gap: '1rem',
              }}
            >
              <Typography variant="h4" fontWeight="500" fontSize="1rem">
                {c.title}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: '1rem',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h4" fontWeight="700" fontSize="1.7rem">
                  {c.value}
                </Typography>
                {c.img}
              </Box>
            </StatisticCard>
          </Grid>
        ))}
      </Grid>
    );
  });
