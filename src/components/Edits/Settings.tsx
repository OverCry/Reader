import DirectoryContext from '@MainContext';
import { Drawer, Stack } from '@mui/material';
import { useContext } from 'react';
import WidthController from './WidthController';
import YoutubeComponent from './YoutubeComponent';

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
      <Stack
        direction='column'
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <WidthController />
        <YoutubeComponent />
      </Stack>
    </Drawer>
  );
};

export default Settings;
