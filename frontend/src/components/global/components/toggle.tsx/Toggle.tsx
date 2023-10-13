import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup';

type ToggleProps = {
  values: {
    value: string | number;
    label: string | number;
    icon?: React.ReactNode;
  }[];
  currentObj: string | number;
  otherProps?: ToggleButtonGroupProps;
  handleChange: (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newValue: any
  ) => void;
};

export const ToggleComp: React.FC<ToggleProps> = ({
  values,
  currentObj,
  handleChange,
  otherProps,
}) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={currentObj}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        '& .MuiToggleButton-root': {
          borderRadius: '20px',
          padding: '0.5rem 1rem',
          '&.Mui-selected': {
            backgroundColor: 'toggle.main',
            borderColor: 'none',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
              borderColor: 'none',
            },
          },
          '&:hover': {
            backgroundColor: 'primary.light',
            borderColor: 'none',
          },
        },
      }}
      {...otherProps}
    >
      {values.map((v, idx) => (
        <ToggleButton
          key={idx}
          value={v.value}
          sx={{
            gap: '0.5rem',
          }}
        >
          {v?.icon}
          {v.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
