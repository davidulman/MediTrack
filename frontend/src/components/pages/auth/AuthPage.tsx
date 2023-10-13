import { Box, Container } from '@mui/material';
import { LoginFormController } from './login/LoginFormController';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ToggleComp } from '../../global/components/toggle.tsx/Toggle';
import {
  LANGUAGES_VALUES,
  TOGGLE_VALUES_LOGIN,
} from '../../global/config/toogleConfig';
import { useTranslation } from 'react-i18next';
import { uiSlice } from '../../../redux/uiSlice';
import { AuthView } from './enums/AuthView';
import { RegisterFormController } from './register/RegisterFormController';
import { changeLanguage } from 'i18next';

export const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentPageView = useSelector(
    (s: RootState) => s.Ui.authPage.currentView
  );
  const currentLanguage = useSelector(
    (s: RootState) => s.Ui.language.currentLanguage
  );

  const togglePageChangeHandler = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    newValue: string
  ) => {
    if (newValue === null) return;
    dispatch(uiSlice.actions.setAuthPageView(newValue));
  };

  const toggleLangChangeHandler = (
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
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '2rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <ToggleComp
          values={TOGGLE_VALUES_LOGIN(t)}
          currentObj={currentPageView}
          handleChange={togglePageChangeHandler}
        />
        <ToggleComp
          values={LANGUAGES_VALUES(t)}
          currentObj={currentLanguage}
          handleChange={toggleLangChangeHandler}
        />
      </Box>
      {currentPageView === AuthView.LOGIN && <LoginFormController />}
      {currentPageView === AuthView.REGISTER && <RegisterFormController />}
    </Container>
  );
};
