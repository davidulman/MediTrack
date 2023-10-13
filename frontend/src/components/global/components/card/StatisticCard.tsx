import { Card, CardProps } from '@mui/material';

interface StatisticCardProps {
  sx?: CardProps['sx'];
  children: React.ReactNode;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  children,
  sx,
}) => {
  return (
    <Card
      elevation={3}
      sx={{
        ...sx,
        borderRadius: '1.8rem',
        display: 'flex',
      }}
    >
      {children}
    </Card>
  );
};
