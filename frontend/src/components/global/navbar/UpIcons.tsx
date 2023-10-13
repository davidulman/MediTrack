import { Box, IconButton, Tooltip } from '@mui/material';
import {
  DarkModeOutlined,
  LightModeOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { uiSlice } from '../../../redux/uiSlice';
import { memo } from 'react';
import { RootState } from '../../../redux/store';
import { darkModeHandler } from '../darkmode/DarkMode';

export const UpIcons: React.FC = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const uiState = useSelector((state: RootState) => state.Ui);
  const uiDarkMode = uiState.darkMode;

  const openSettingsHandler = () =>
    dispatch(uiSlice.actions.toggleSettingsModal());

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center">
      <Tooltip title={t('tooltip.appSettings')}>
        <IconButton color="secondary" onClick={openSettingsHandler}>
          <SettingsOutlined />
        </IconButton>
      </Tooltip>
      <IconButton
        color="secondary"
        aria-label="change dark mode"
        onClick={() => darkModeHandler(uiDarkMode, dispatch)}
      >
        {uiDarkMode.darkMode === 'dark' ? (
          <Tooltip title={t('tooltip.lightMode')}>
            <LightModeOutlined />
          </Tooltip>
        ) : (
          <Tooltip title={t('tooltip.darkMode')}>
            <DarkModeOutlined />
          </Tooltip>
        )}
      </IconButton>
    </Box>
  );
});
