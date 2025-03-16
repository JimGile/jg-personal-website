// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Menu from './Menu';
import { getMenuItemComponent } from './menuConstants';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Footer from './Footer';

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('About');

  return (
    <div className="App">
      <Header />
      <Row className="mb-3 row">
        <Col sm="3">
          <Menu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} />
        </Col>
        <Col sm="9">
          <div className="main-content">
            {getMenuItemComponent(selectedMenuItem).component}
          </div>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default App;
