import { Card } from '@mui/material';
import './App.css';
import Settings from './components/Settings';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Card>
          With MUI
          <p>In Tags</p>
        </Card>
        <Settings />
        Custom Content Here We Go?
      </header>
    </div>
  );
}

export default App;
