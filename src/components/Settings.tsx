import { Drawer } from '@mui/material';
import React, { useContext } from 'react';
import DirectoryContext from '../AppContext/Provider/DirectoryContext';

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
    ></Drawer>
  );
};

export default Settings;
