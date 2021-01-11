import React from 'react';

import Calendar from '../calendar';
import Recorder from '../recorder';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Recorder />
      <Calendar />
    </div>
  );
};

export default App;
