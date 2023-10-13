import {
  AddCircleOutline,
  DashboardOutlined,
  KeyboardArrowRight,
  EditNote,
  LocalHospital,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Breadcrumbs, Link, LinkProps } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Link {...props} component={RouterLink as any} />;
}

export const BreadCrumbsComp: React.FC = () => {
  const { t } = useTranslation();

  const routesList = [
    {
      text: t('menu.medicalHistory'),
      link: '/medical-history',
      icon: <LocalHospital />,
    },
  ];

  const location = useLocation();
  const currentPath = location.pathname.split('/');
  const hasNew = currentPath?.includes('create');
  const hasEdit = currentPath?.includes('update');
  const homePage = currentPath[1] === '';
  const findLink = routesList?.filter((i) => i.link.includes(currentPath[1]));
  const removePrefix = location.pathname.split('/').slice(0, -1).join('/');

  const stateBreadCrumbs = useSelector(
    (state: RootState) => state.Ui.breadcrumbs.currentBreadcrumb
  );

  const stateBreadCrumbsRemovePrefix = useSelector(
    (state: RootState) => state.Ui.breadcrumbs.removePrefix
  );

  const stateNotActive = stateBreadCrumbs === null || undefined || '';

  const defaultLinks = [
    { text: 'Dashboard', link: '/', icon: <DashboardOutlined /> },
    ...(homePage ? [] : findLink),

    ...(stateNotActive
      ? []
      : [
          {
            text: stateBreadCrumbs,
            link: `${
              stateBreadCrumbsRemovePrefix ? removePrefix : location.pathname
            }`,
            icon: <VisibilityOutlined />,
          },
        ]),

    ...(hasNew
      ? [
          {
            text: `${t('breadCrumbs.new')} ${findLink[0].text}`,
            link: `${location.pathname}`,
            icon: <AddCircleOutline />,
          },
        ]
      : []),
    ...(hasEdit
      ? [
          {
            text: `${t('breadCrumbs.edit')} ${findLink[0].text}`,
            link: `${location.pathname}`,
            icon: (
              <EditNote
                sx={{
                  fontSize: '2rem',
                }}
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <div
      role="presentation"
      style={{
        marginTop: '2rem',
        marginLeft: '1rem',
        marginBottom: '1rem',
      }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<KeyboardArrowRight fontSize="small" />}
      >
        {defaultLinks.map((i) => (
          <LinkRouter
            key={i.link}
            to={i.link}
            underline="hover"
            color="inherit"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {i.icon}
            {i.text}
          </LinkRouter>
        ))}
      </Breadcrumbs>
    </div>
  );
};
