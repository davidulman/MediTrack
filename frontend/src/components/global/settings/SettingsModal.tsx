import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import Modal from '../components/modal/Modal';
import { DarkModeValue, darkModeChangeHandler } from '../darkmode/DarkMode';
import { uiSlice } from '../../../redux/uiSlice';
import { DARK_MODAL_VALUES, LANGUAGES_VALUES } from '../config/toogleConfig';
import { ToggleComp } from '../components/toggle.tsx/Toggle';

const ui = uiSlice.getInitialState();

type DarkModeModalProps = {
  uiState: typeof ui;
};

export const SettingsModal: React.FC<DarkModeModalProps> = ({ uiState }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const objectHandlerClose = () => {
    dispatch(uiSlice.actions.toggleSettingsModal());
  };
  const objectChangeHandler = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    newValue: DarkModeValue
  ) => {
    if (newValue === null) return;

    darkModeChangeHandler(newValue, dispatch);
  };

  const languageChangeHandler = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    newValue: string
  ) => {
    if (newValue === null) return;
    dispatch(
      uiSlice.actions.setLanguage({
        currentLanguage: newValue,
        currentDatePickerLanguage: newValue === 'de-DE' ? 'de' : 'en-gb',
        currentComponentLanguage: newValue === 'de-DE' ? 'deDE' : 'enGB',
      })
    );
    localStorage.setItem('appLanguage', newValue);
    changeLanguage(newValue);
  };

  return (
    <Modal
      open={uiState.settings.openModal}
      openState={uiState.settings.openModal}
      closeState={objectHandlerClose}
      title={t('settingModal.title')}
    >
      <>
        <Typography
          textAlign="center"
          marginBottom="1rem"
          fontWeight="500"
          fontSize="1.2rem"
          variant="h6"
        >
          {t('settingModal.darkMode')} {t('settingModal.title')}
        </Typography>
        <ToggleComp
          values={DARK_MODAL_VALUES(t)}
          currentObj={uiState.darkMode.darkModeSetting || 'auto'}
          handleChange={objectChangeHandler}
          otherProps={{
            size: 'large',
          }}
        />
        <Typography
          textAlign="center"
          marginTop="2rem"
          marginBottom="1rem"
          fontWeight="500"
          fontSize="1.2rem"
          variant="h6"
        >
          {t('settingModal.language')} {t('settingModal.title')}
        </Typography>
        <ToggleComp
          values={LANGUAGES_VALUES(t)}
          currentObj={uiState.language.currentLanguage}
          handleChange={languageChangeHandler}
          otherProps={{
            size: 'large',
          }}
        />
      </>
    </Modal>
  );
};
