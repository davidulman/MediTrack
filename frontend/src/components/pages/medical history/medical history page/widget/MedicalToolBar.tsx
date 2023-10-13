import { ReactNode, memo } from 'react';
import { ShortText } from '@mui/icons-material';
import { TFunction } from 'i18next';
import { MedicalHistoryQuery } from '../../../../../types/redux/MedicalHistoryQuery';
import { CardToolbar } from '../../../../global/components/card/CardToolbar';
import { MedicalTypeTranslation } from '../../../../../types/translation/MedicalTypeTranslation';
import { SiMonkeytype } from 'react-icons/si';

type CardData = {
  icon: ReactNode;
  data: string;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontSize: string;
};

interface MedicalToolBarProps {
  medicalData: MedicalHistoryQuery;
  t: TFunction;
}

export const MedicalToolBar: React.FC<MedicalToolBarProps> = memo(
  ({ medicalData, t }) => {
    const medicalTypeOptions: MedicalTypeTranslation = t('medicalTypeOptions', {
      returnObjects: true,
    });

    const cardData: CardData[] = [
      {
        icon: <SiMonkeytype size="1.5rem" />,
        data: medicalTypeOptions[medicalData.medicalType] || '',
        variant: 'h3',
        fontSize: '1rem',
      },
      {
        icon: <ShortText />,
        data: medicalData.medicalDescription || '',
        variant: 'h3',
        fontSize: '1rem',
      },
    ];

    const pageProps = {
      id: medicalData?._id || '',
      cardData: cardData as never,
    };

    return <CardToolbar pageProps={pageProps} />;
  }
);
