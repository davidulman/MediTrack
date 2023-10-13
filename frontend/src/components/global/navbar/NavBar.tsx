import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Toolbar,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Footer } from '../footer/Footer';
// import Image from 'mui-image';
// import Avi from './Avi.png';
// import AviDarkMode from './AviDarkMode.png';
import { RootState } from '../../../redux/store';
import { darkModeCheck } from '../darkmode/DarkMode';
import { uiSlice } from '../../../redux/uiSlice';
import { SettingsModal } from '../settings/SettingsModal';
import { AppBar } from './CustomDrawer';
import { Drawer as MainDrawer } from './CustomDrawer';
import { SideBar } from './SideBar';
import { SideBarActions } from './SideBarActions';
import { UpIcons } from './UpIcons';
import { authSlice } from '../../../redux/auth';
import { Link, Outlet } from 'react-router-dom';
import { checkLanguage } from '../../hooks/checkLanguage';
import { useEffect } from 'react';
import { BreadCrumbsComp } from '../components/bread crumbs/BreadCrumbs';

export const NavBar: React.FC = () => {
  const uiState = useSelector((state: RootState) => state.Ui);
  const auth = useSelector((state: RootState) => state.Auth);
  const uiNavBar = uiState.navbar;
  const userEmail = auth.entities?.email;
  const open = uiNavBar.open;

  const tokenState = useSelector((state: RootState) => state.Auth.loginTime);
  const isLoggedIn = tokenState !== null;

  const dispatch = useDispatch();

  const toggleDrawer = () => {
    dispatch(uiSlice.actions.toggleNavBar());
  };

  useEffect(() => {
    darkModeCheck(uiState.darkMode, dispatch);
    checkLanguage(dispatch);
  }, [dispatch, uiState.darkMode]);

  const logoutHandler = () => {
    dispatch(authSlice.actions.logout());
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const openTerm = open && isMobile;

  return (
    <Box sx={{ display: 'flex' }}>
      <SettingsModal uiState={uiState} />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: (theme) =>
            uiState.darkMode.darkMode === 'dark'
              ? theme.palette.darkMode.main
              : theme.palette.lightMode.main,
        }}
      >
        <Toolbar
          sx={{
            pr: '24px',
          }}
        >
          <IconButton
            edge="start"
            color="secondary"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '0.8rem',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            {/* <Image
              src={uiNavi.darkMode === 'dark' ? AviDarkMode : Avi}
              width="7rem"
              duration={0}
            /> */}
          </Link>
          <Toolbar
            sx={{
              marginLeft: 'auto',
            }}
          >
            {!openTerm && <UpIcons />}
          </Toolbar>
        </Toolbar>
      </AppBar>
      {!isMobile ? (
        <MainDrawer
          variant={'permanent'}
          open={open}
          onClose={toggleDrawer}
          sx={{
            '& .MuiDrawer-paper': {
              bgcolor: (theme) => theme.palette.sideBar.main,
            },
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <SideBar open={open} />
          <Divider />
          <SideBarActions
            open={open}
            isLoggedIn={isLoggedIn}
            logoutHandler={logoutHandler}
            email={userEmail}
          />
        </MainDrawer>
      ) : (
        <Drawer
          variant={'temporary'}
          open={open}
          onClose={toggleDrawer}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <Divider />
          <SideBar open={open} />
          <Divider />
          <SideBarActions
            open={open}
            isLoggedIn={isLoggedIn}
            logoutHandler={logoutHandler}
          />
        </Drawer>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Box
          component="main"
          className="meditrack-body"
          sx={{
            flexGrow: 1,
          }}
        >
          <Toolbar />
          <BreadCrumbsComp />
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};
