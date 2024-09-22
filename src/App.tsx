import { Card } from '@mui/material';
import './App.css';
import React, { useState } from 'react'; //needed otherwise eslint complains
import DirectoryContext from './AppContext/Provider/DirectoryContext';

function App() {
  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <div className='App'>
      <header className='App-header'>
        <DirectoryContext.Provider
          value={{
            page: 0,
            openNav,
            setOpenNav,
          }}
        >
          <Card>
            With MUI
            <p>In Tags</p>
          </Card>
          Custom Content Here We Go?
        </DirectoryContext.Provider>
      </header>
    </div>
  );
}

export default App;
