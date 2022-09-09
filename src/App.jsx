import { useState } from 'react';
import './App.scss';
import card_logo from './assets/card-logo.svg';
import Form from './components/Form';

function App() {
  const [cardInfo, setCardInfo] = useState({
    cardholderName: 'Jane Appleseed',
    number: '',
    cvc: '000',
  });

  return (
    <div className="wrapper">
      <div className="left-panel">
        <div className="card card-front">
          <img src={card_logo} alt="Card logo" />
          <div className="card-details">
            <div className="number">
              {cardInfo.number == ''
                ? '0000 0000 0000 0000 0000'
                : cardInfo.number}
            </div>
            <div className="name-date">
              <div className="name">{cardInfo.cardholderName}</div>
              <div className="date">00/00</div>
            </div>
          </div>
        </div>
        <div className="card card-back">
          <div className="cvc">{cardInfo.cvc}</div>
        </div>
      </div>
      <div className="right-panel">
        <Form cardInfo={cardInfo} setCardInfo={setCardInfo} />
      </div>
    </div>
  );
}

export default App;
