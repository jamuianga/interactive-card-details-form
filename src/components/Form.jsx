import React, { useState } from 'react';
import './Form.scss';

function Form({ cardInfo, setCardInfo }) {
  const [errCardholderName, setErrCardholderName] = useState('');
  const [showErrCardholderName, setShowErrCardholderName] = useState(false);
  const [errCardNumber, setErrCardNumber] = useState('');
  const [showErrCardNumber, setShowErrCardNumber] = useState(false);
  const [errCardDate, setErrCardDate] = useState('');
  const [showErrCardDate, setShowErrCardDate] = useState({
    mm: false,
    yy: false,
  });
  const [errCvc, setErrCvc] = useState('');
  const [showErrCvc, setShowErrCvc] = useState(false);

  const cardholderNameOnChange = (e) => {
    setCardInfo((prevCardInfo) => {
      return {
        ...prevCardInfo,
        cardholderName: e.target.value,
      };
    });
  };

  const cvcOnChange = (e) => {
    setCardInfo((prevCardInfo) => {
      return {
        ...prevCardInfo,
        cvc: e.target.value,
      };
    });
  };

  const cardNumberonChange = (e) => {
    const { value } = e.target;

    const number =
      value
        .replace(/\s/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .substr(0, 19) || '';

    setCardInfo((prevCardInfo) => {
      return {
        ...prevCardInfo,
        number,
      };
    });
  };

  const monthOnChange = (e) => {
    setCardInfo((prevCardInfo) => {
      return {
        ...prevCardInfo,
        mm: e.target.value,
      };
    });
  };

  const yearOnChange = (e) => {
    setCardInfo((prevCardInfo) => {
      return {
        ...prevCardInfo,
        yy: e.target.value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setErrCardholderName('');
    setErrCardNumber('');
    setErrCardDate('');
    setErrCvc('');
    setShowErrCardholderName(false);
    setShowErrCardNumber(false);
    setShowErrCardDate(false);
    setShowErrCvc(false);

    if (!cardInfo.cardholderName) {
      setErrCardholderName("Can't be blank");
      setShowErrCardholderName(true);
    }

    if (!cardInfo.number) {
      setErrCardNumber("Can't be blank");
      setShowErrCardNumber(true);
    }

    if (!cardInfo.mm || !cardInfo.yy) {
      setErrCardDate("Can't be blank");
      setShowErrCardDate({
        mm: !cardInfo.mm,
        yy: !cardInfo.yy,
      });
    }

    if (!cardInfo.cvc) {
      setErrCvc("Can't be blank");
      setShowErrCvc(true);
    }

    if (
      showErrCardholderName ||
      showErrCardNumber ||
      showErrCardDate ||
      showErrCvc
    )
      return;

    console.log(cardInfo);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Cardholder name</label>
        <input
          type="text"
          placeholder="e.g. Jane Appleseed"
          onChange={cardholderNameOnChange}
          className={showErrCardholderName ? 'danger' : ''}
          maxLength={30}
        />
        <small>{showErrCardholderName && errCardholderName}</small>
      </div>
      <div className="form-group">
        <label htmlFor="">Card number</label>
        <input
          type="tel"
          placeholder="e.g. 1234 5678 9123 0000"
          className={showErrCardNumber ? 'danger' : ''}
          onChange={cardNumberonChange}
          value={cardInfo.number}
        />
        <small>{showErrCardNumber && errCardNumber}</small>
      </div>
      <div className="inline-form-group">
        <div className="form-group">
          <label htmlFor="">Exp. Date (mm/yy)</label>
          <div className="inline-input expire-date">
            <input
              type="text"
              className={showErrCardDate.mm ? 'danger' : ''}
              placeholder="MM"
              maxLength={2}
              onChange={monthOnChange}
            />
            <input
              type="text"
              className={showErrCardDate.yy ? 'danger' : ''}
              placeholder="YY"
              maxLength={2}
              onChange={yearOnChange}
            />
          </div>
          <small>{errCardDate}</small>
        </div>
        <div className="form-group">
          <label>cvc</label>
          <input
            type="text"
            placeholder="e.g. 123"
            className={`cvc ${showErrCvc ? 'danger' : ''}`}
            maxLength={3}
            onChange={cvcOnChange}
          />
          <small>{showErrCvc && errCvc}</small>
        </div>
      </div>
      <button type="submit">Confirm</button>
    </form>
  );
}

export default Form;
