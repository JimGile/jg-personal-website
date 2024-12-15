// src/App.js
import React from 'react';
import './App.css';
import Header from './Header';
import About from './About';
import AiAndMl from './AiAndMl';
import AppDevelopment from './AppDevelopment';
import Climbing from './Climbing';
import Contact from './Contact';

function App() {
  return (
    <div className="App">
      <Header />
      <About />
      <AiAndMl />
      <AppDevelopment />
      <Climbing />
      <Contact />
    </div>
  );
}

export default App;
