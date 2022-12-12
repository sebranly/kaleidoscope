import React from 'react';
import { WEBSITE_TITLE } from './constants/general';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>{WEBSITE_TITLE}</p>
      </header>
      <Footer />
    </div>
  );
}

export default App;
