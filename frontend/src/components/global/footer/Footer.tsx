import { Paper, Box, Typography, useMediaQuery } from '@mui/material';

export const Footer: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:720px)');

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignContent: 'center',
        padding: '0.3rem 1rem',
        flexWrap: 'wrap-reverse',
        textAlign: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography fontSize="0.9rem" textAlign="center">
          Copyright © {new Date().getFullYear()} MediTrack
        </Typography>
      </Box>
    </Paper>
  );
};
