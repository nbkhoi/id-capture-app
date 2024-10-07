import React from 'react';
import './App.css';
import IDCapture from './components/IDCapture';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>ID Capture Application</h1>
      <IDCapture />
    </div>
  );
}

export default App;
