import { memo, useEffect } from 'react';
import { Button, Grid, Typography, Box } from '@mui/material';
import { DeleteForever, Edit } from '@mui/icons-material';
import { TFunction } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { StatisticCard } from '../../../../global/components/card/StatisticCard';

interface MedicalActionsProps {
  deleteFunc: () => Promise<void>;
  isSuccess: boolean;
  t: TFunction;
}

export const MedicalActions: React.FC<MedicalActionsProps> = memo(
  ({ deleteFunc, isSuccess, t }) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (isSuccess) {
        navigate('/medical-history');
      }
    }, [isSuccess, navigate]);

    return (
      <Grid
        container
        spacing={2}
        rowGap={1}
        sx={{
          border: 'none',
        }}
      >
        <Grid item xs={12} md={4}>
          <StatisticCard
            sx={{
              display: 'flex',
              p: '0.8rem',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '1rem',
              marginBottom: '1rem',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h4"
              fontWeight="500"
              fontSize="1rem"
              textAlign="center"
            >
              {t('medicalHistoryForm.actions')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                p: 1,
              }}
            >
              <Button startIcon={<Edit />} onClick={() => navigate(`update`)}>
                {t('medicalHistoryForm.edit')}
              </Button>

              <Button
                startIcon={<DeleteForever />}
                color="error"
                onClick={deleteFunc}
              >
                {t('medicalHistoryForm.delete')}
              </Button>
            </Box>
          </StatisticCard>
        </Grid>
      </Grid>
    );
  }
);
