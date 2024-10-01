// import DirectoryContext from '@MainContext';
import { Drawer } from '@mui/material';
import { DirectoryContext } from '../AppContext/Provider';
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
      key={`drawer_navMainDefault`}
      {...{
        sx: { zIndex: 3000 },
        variant: 'temporary',
        ModalProps: { keepMounted: true },
        PaperProps: {},
        open: openNav,
        onClose: closeDraw,
      }}
    >
      wuzzup
    </Drawer>
  );
};

export default Settings;
