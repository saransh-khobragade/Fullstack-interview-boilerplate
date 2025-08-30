import './App.css';
import type { ReactElement } from 'react';
import Home from './components/notepad/Home';
import { NotepadProvider } from './contexts/NotepadContext';

function App(): ReactElement {
  return (
    <NotepadProvider>
      <Home />
    </NotepadProvider>
  );
}

export default App;
