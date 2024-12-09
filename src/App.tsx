import React, { useEffect, useState } from 'react'; //needed otherwise eslint complains
import Settings from './components/Settings';
import ViewMenu from './components/ViewMenu';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Box, IconButton, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { theme } from './Theme/muiTheme';
import DirectoryContext from '@MainContext';
import { FileWithPath } from 'react-dropzone';
import DisplayContent from './components/DisplayContent';

function App() {
  const [openView, setOpenView] = useState<boolean>(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [openNav, setOpenNav] = useState<boolean>(false);

  useEffect(() => {
    if (files.length === 0) {
      setOpenView(true);
    }
  }, []);

  const triggerView = () => {
    setOpenView(!openView);
  };

  const triggerSetting = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <DirectoryContext.Provider
          value={{
            page: 0,
            openNav,
            setOpenNav,
            openView,
            setOpenView,
            files,
            setFiles,
          }}
        >
          <AppBar position='fixed' color='primary' sx={{ bottom: 'auto', top: 0 }}>
            {/* <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}> */}

            <Toolbar>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 2 }}
                onClick={triggerView}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>
              <IconButton size='large' color='inherit' aria-label='menu' key={'Settings'} onClick={triggerSetting}>
                <SettingsIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box component='main' sx={{ pt: 8 }}>
            <DisplayContent />
          </Box>
          <ViewMenu />
          <Settings />
        </DirectoryContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
