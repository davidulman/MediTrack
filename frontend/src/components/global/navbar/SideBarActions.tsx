import { Logout, Login } from '@mui/icons-material';
import {
  Divider,
  // IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

type SideBarProps = {
  open: boolean;
  isLoggedIn: boolean;
  logoutHandler: MouseEventHandler<HTMLDivElement>;
  email?: string | null;
};

interface Item {
  text: string;
  link?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  icon: React.ReactNode;
}

export const SideBarActions: React.FC<SideBarProps> = ({
  open,
  isLoggedIn,
  logoutHandler,
  // email,
}) => {
  const { t } = useTranslation();
  const items: (Item | boolean)[] = [
    isLoggedIn
      ? {
          text: t('menu.logout'),
          onClick: logoutHandler,
          icon: <Logout />,
        }
      : { text: t('menu.login'), link: '/login', icon: <Login /> },
  ];

  return (
    <List>
      {items
        .filter((item): item is Item => Boolean(item))
        .map(({ text, link = '#', onClick, icon }) => (
          <Tooltip id={text} title={text} arrow placement="right" key={text}>
            <Link
              to={link}
              key={text}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  key={text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={onClick}
                >
                  <ListItemIcon
                    key={text}
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          </Tooltip>
        ))}
      <Divider />
    </List>
  );
};
