import React from 'react';
import './App.css';
import Payment from './components/Payment'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Payment></Payment>
      </header>
    </div>
  )
}

export default App;
