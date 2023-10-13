import { Close } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ModalProps,
  Toolbar,
} from '@mui/material';
import React from 'react';

interface UIModalProps extends ModalProps {
  openState: boolean;
  closeState: () => void;
}
const Modal: React.FC<UIModalProps> = ({
  openState,
  closeState,
  title,
  children,
}) => {
  return (
    <Dialog
      open={openState}
      onClose={closeState}
      fullWidth
      maxWidth="sm"
      transitionDuration={500}
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
          maxHeight: '100%',
          margin: 0,
          p: 1,
          borderRadius: '20px',
        },
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={closeState}>
          <Close />
        </IconButton>
        <DialogTitle>{title}</DialogTitle>
      </Toolbar>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
