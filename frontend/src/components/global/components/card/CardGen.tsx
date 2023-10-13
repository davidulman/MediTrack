import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Image from 'mui-image';
import { CardComp } from './Card';

export interface CardListProps {
  dataProps: {
    id: string;
    title: string;
    date?: string;
    secondText?: string | React.ReactElement;
    email?: string;
    name?: string;
    titleTooltip?: string;
    otherLocation?: string;
    maxWidth?: number;
    icon?: boolean;
    iconSrc?: string;
  };
}

export const CardGen: React.FC<CardListProps> = ({ dataProps }) => {
  const navigate = useNavigate();

  const {
    id,
    title,
    date,
    secondText,
    titleTooltip,
    otherLocation,
    maxWidth,
    icon,
    iconSrc,
  } = dataProps;

  const navigateHandler = () => {
    if (otherLocation) {
      return navigate(`${otherLocation}/${id}`);
    }
    return navigate(`${id}`);
  };

  return (
    <Box
      key={id}
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <CardComp
        key={id}
        titleTooltip={titleTooltip}
        head={title}
        secondText={secondText}
        date={date}
        click={navigateHandler}
        sx={{
          '&.MuiCard-root': {
            borderRadius: '15px',
            p: '0.2rem',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            border: (theme: any) =>
              `1px solid ${theme.palette.primary.secondary}`,
          },
        }}
        icon={
          icon && (
            <>
              <Image
                src={iconSrc as string}
                width="5rem"
                duration={800}
                style={{
                  borderRadius: '30%',
                  pointerEvents: 'none',
                }}
              />
            </>
          )
        }
        maxWidth={maxWidth}
      />
    </Box>
  );
};
