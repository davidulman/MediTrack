import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type NotFoundProps = {
  message?: string;
  btn?: string;
  click?: () => void;
};

export const NoItemsFound: React.FC<NotFoundProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        marginTop: '3rem',
        gap: '1rem',
      }}
    >
      <ErrorOutline style={{ fontSize: 65, color: 'red' }} />
      <Typography
        variant="h4"
        color="error"
        marginTop="1.5rem"
        textAlign="center"
      >
        {props.message || t('notFound.noDataFoundDefault') + ' !'}
      </Typography>
      {props?.btn && (
        <Button variant="contained" color="primary" onClick={props?.click}>
          {props?.btn}
        </Button>
      )}
    </Box>
  );
};
