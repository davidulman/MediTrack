import { Box, CircularProgress, Portal, Typography } from '@mui/material';
import { LoaderProps } from '../../../types/global/LoaderTypes';

const Loader: React.FC<LoaderProps> = ({ loadingText, circularColor }) => {
  const loader = (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '4px',
        }}
      >
        <CircularProgress
          size={100}
          color={circularColor ? circularColor : 'secondary'}
        />
        <Typography
          variant="h6"
          textAlign="center"
          fontWeight="600"
          marginTop="1rem"
          color="secondary"
        >
          {loadingText}
        </Typography>
      </Box>
    </Box>
  );

  return <Portal>{loader}</Portal>;
};

export default Loader;
