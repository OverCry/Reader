import React, { useState } from 'react'; //needed otherwise eslint complains
import DirectoryContext from './AppContext/Provider/DirectoryContext';
import Settings from './components/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, IconButton, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { theme } from './Theme/muiTheme';

function App() {
  const [openNav, setOpenNav] = useState<boolean>(false);

  const triggerDrawer = () => {
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
          }}
        >
          <AppBar position='fixed' color='primary' sx={{ bottom: 'auto', top: 0 }}>
            {/* <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}> */}

            <Toolbar>
              <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
                <MenuIcon onClick={triggerDrawer} />
              </IconButton>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>
              <IconButton color='inherit' key={'Settings'}>
                <SettingsIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {/* Creater Header */}
          {/* <div style={{ minHeight: '100vh', backgroundColor: 'red' }}></div>
          <div style={{ minHeight: '100vh', backgroundColor: 'blue' }}></div> */}

          <Settings />
        </DirectoryContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
