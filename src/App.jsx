import { useState } from 'react';
import './App.scss';
import card_logo from './assets/card-logo.svg';

function App() {
  return (
    <div className="wrapper">
      <div className="left-panel">
        <div className="card card-front">
          <img src={card_logo} alt="Card logo" />
          <div className="card-details">
            <div className="number">0000 0000 0000 0000 0000</div>
            <div className="name-date">
              <div className="name">John Doe</div>
              <div className="date">00/00</div>
            </div>
          </div>
        </div>
        <div className="card card-back">card back</div>
      </div>
      <div className="right-panel">
        <div className="card-form">form</div>
        <div className="card-form">form submited</div>
      </div>
    </div>
  );
}

export default App;
