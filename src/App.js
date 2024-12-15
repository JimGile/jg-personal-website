// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import About from './About';
import AiAndMl from './AiAndMl';
import AppDevelopment from './AppDevelopment';
import Climbing from './Climbing';
import Contact from './Contact';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('About');

  const menuItems = [
    { name: 'About', component: <About /> },
    { name: 'AI and Machine Learning', component: <AiAndMl /> },
    { name: 'Application Development', component: <AppDevelopment /> },
    { name: 'Climbing Expeditions', component: <Climbing /> },
    { name: 'Contact', component: <Contact /> },
  ];

  return (
    <div className="App">
      <Header />
      <Row className="mb-3 row">
        <Col sm="3">
          <div className="menu">
            {menuItems.map((menuItem, index) => (
              <div key={index} className="menu-item" onClick={() => setSelectedMenuItem(menuItem.name)}>
                <h5>{menuItem.name}</h5>
              </div>
            ))}
          </div>
        </Col>
        <Col sm="9">
          <div className="main-content">
            {menuItems.find((menuItem) => menuItem.name === selectedMenuItem).component}
          </div>
        </Col>
      </Row>
    </div>
  );
}


// import React from 'react';
// import './App.css';
// import Header from './Header';
// import About from './About';
// import AiAndMl from './AiAndMl';
// import AppDevelopment from './AppDevelopment';
// import Climbing from './Climbing';
// import Contact from './Contact';

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <About />
//       <AiAndMl />
//       <AppDevelopment />
//       <Climbing />
//       <Contact />
//     </div>
//   );
// }

export default App;
