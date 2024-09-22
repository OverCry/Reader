import { Card } from '@mui/material';
import './App.css';
import Settings from './components/Settings';
import React from 'react'; //needed otherwise eslint complains
import DirectoryContext from './AppContext/Provider/DirectoryContext';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <DirectoryContext.Provider
          value={{
            page: 0,
          }}
        >
          <Card>
            With MUI
            <p>In Tags</p>
          </Card>
          <Settings />
          Custom Content Here We Go?
        </DirectoryContext.Provider>
      </header>
    </div>
  );
}

export default App;
