import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

import { CloseRounded } from '@mui/icons-material';

interface SpeedDialProps {
  config: {
    icon: React.ReactNode;
    name: string;
    handler: () => void;
  }[];
}

export const SpeedDialComp: React.FC<SpeedDialProps> = ({ config }) => {
  return (
    <SpeedDial
      ariaLabel="Aktionen"
      sx={{
        position: 'absolute',
        bottom: 70,
        right: 16,
      }}
      icon={
        <SpeedDialIcon
          openIcon={<CloseRounded />}
          sx={{
            color: '#ffff',
          }}
        />
      }
    >
      {config?.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={action.handler}
          sx={{
            '& .MuiSpeedDialAction-staticTooltipLabel': {
              fontSize: '1.1rem',
              whiteSpace: 'nowrap',
            },
          }}
        />
      ))}
    </SpeedDial>
  );
};
