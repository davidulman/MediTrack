import { Box, Card, Grid, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import Image from 'mui-image';
import { memo } from 'react';

interface CardToolbarProps {
  pageProps: {
    id: string;
    icon?: boolean;
    iconSrc?: string;
    otherIconsStyleProps?: React.CSSProperties | undefined;
    iconOnClick?: () => void;
    cardData: [
      {
        icon?: React.ReactNode;
        data?: string | React.ReactNode;
        link?: string | undefined;
        variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        fontWeight?: string | undefined;
        color?: string | undefined;
        fontSize?: string | undefined;
      }
    ];
  };
}

export const CardToolbar: React.FC<CardToolbarProps> = memo(({ pageProps }) => {
  const { cardData, icon, iconSrc, otherIconsStyleProps, iconOnClick } =
    pageProps;
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const copyHandler = (value: { data: string }) => {
    navigator.clipboard.writeText(value.data);
    enqueueSnackbar(`${t('tooltip.copied')} - "${value.data}"`, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      autoHideDuration: 1200,
    });
  };

  return (
    <Card
      elevation={7}
      sx={{
        p: '1rem',
        borderRadius: '1.3rem',
      }}
    >
      <Grid container gap="1.5rem">
        {icon && (
          <Box
            onClick={iconOnClick}
            sx={{
              cursor: 'pointer',
            }}
          >
            <Image
              src={iconSrc as string}
              width="5rem"
              duration={800}
              style={{
                borderRadius: '30%',
                pointerEvents: 'none',

                ...otherIconsStyleProps,
              }}
            />
          </Box>
        )}

        {cardData?.map((item, idx) => (
          <Tooltip title={t('tooltip.clickToCopy')} key={idx}>
            <Grid
              item
              key={idx}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
              onClick={() => copyHandler(item as never)}
            >
              {item?.icon}
              <Typography
                fontWeight={item?.fontWeight ? item?.fontWeight : '600'}
                variant={item.variant || 'h6'}
                fontSize={item?.fontSize || '1.2rem'}
              >
                {!item?.link && item?.data}
                {item?.link && (
                  <Link
                    to={`${item?.link}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {item?.data}
                  </Link>
                )}
              </Typography>
            </Grid>
          </Tooltip>
        ))}
      </Grid>
    </Card>
  );
});
