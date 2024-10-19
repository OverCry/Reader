import DirectoryContext from '@MainContext';
import { Drawer } from '@mui/material';
import React, { useContext } from 'react';

const Settings = () => {
  const { openNav, setOpenNav } = useContext(DirectoryContext);

  const closeDraw = () => {
    if (setOpenNav) {
      setOpenNav(false);
    }
  };

  return (
    <Drawer
      key={`drawer_settings`}
      {...{
        sx: { zIndex: 3000 },
        variant: 'temporary',
        anchor: 'right',
        ModalProps: { keepMounted: true },
        PaperProps: {},
        open: openNav,
        onClose: closeDraw,
      }}
    >
      settings TBD
    </Drawer>
  );
};

export default Settings;
