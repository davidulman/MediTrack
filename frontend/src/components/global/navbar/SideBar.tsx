import { Dashboard, LocalHospital } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type SideBarProps = {
  open: boolean;
};

export const SideBar: React.FC<SideBarProps> = ({ open }) => {
  const { t } = useTranslation();

  const navigationList = [
    { text: t('menu.dashboard'), link: '/', icon: <Dashboard /> },
    {
      text: t('menu.medicalHistory'),
      link: '/medical-history',
      icon: <LocalHospital />,
    },
  ];

  return (
    <List>
      {navigationList.map(({ text, link, icon }) => (
        <Tooltip key={text} id={text} title={text} arrow placement="right">
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
    </List>
  );
};
