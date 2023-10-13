import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  Tooltip,
  SxProps,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';

export interface CardCompProps {
  sx?: SxProps;
  click?: () => void;
  icon?: React.ReactNode;
  head?: string;
  date?: string;
  secondText?: string | React.ReactElement;
  button?: string;
  deleteHandler?: () => void;
  titleTooltip?: string;
  maxWidth?: number;
}

export const CardComp: React.FC<CardCompProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Card sx={{ maxWidth: props?.maxWidth || 330, minWidth: 300, ...props.sx }}>
      <CardActionArea
        onClick={props.click}
        sx={{
          paddingLeft: '0.5rem',
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        <Box>{props?.icon}</Box>

        <CardContent>
          {props.titleTooltip ? (
            <Tooltip title={props.titleTooltip} arrow>
              <Typography gutterBottom variant="h5" component="div">
                {props?.head}
              </Typography>
            </Tooltip>
          ) : (
            <Typography gutterBottom variant="h5" component="div">
              {props?.head}
            </Typography>
          )}

          {props?.secondText ? (
            <Typography
              variant="h4"
              color="text.secondary"
              marginLeft="0.2rem"
              fontSize="1rem"
              marginBottom="0.5rem"
            >
              {props?.secondText}
            </Typography>
          ) : null}
          {props?.date ? (
            <Typography
              variant="h6"
              color="text.secondary"
              marginLeft="0.2rem"
              fontSize="1rem"
            >
              {t('apartmentsViewer.cratedAt')} {props?.date}
            </Typography>
          ) : null}
        </CardContent>
      </CardActionArea>
      {props?.button && (
        <CardActions>
          <Button size="small" color="error" onClick={props.deleteHandler}>
            {props?.button}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
