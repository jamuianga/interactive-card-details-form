import React, { useEffect, useState } from 'react';
import './Form.scss';

function cardHasExpired(month, year) {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = Number(date.getFullYear().toString().substring(2));
  const checkYear = year - currentYear;

  if (checkYear > 3 || checkYear < 0) {
    return true;
  } else if (year == currentYear && month < currentMonth) {
    return true;
  }

  return false;
}

function Form({ cardInfo, setCardInfo }) {
  let formValid = true;

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
    setCardInfo((prevState) => {
      return {
        ...prevState,
        cardholderName: e.target.value.toUpperCase(),
      };
    });
  };

  const cvcOnChange = (e) => {
    const { value } = e.target;
    const cvc = value.replace(/\s|\D/g, '');

    setCardInfo((prevState) => {
      return { ...prevState, cvc };
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
    const { value } = e.target;
    const mm = value.replace(/\s|\D/g, '');

    setCardInfo((prevState) => {
      return { ...prevState, mm };
    });
  };

  const yearOnChange = (e) => {
    const { value } = e.target;
    const yy = value.replace(/\s|\D/g, '');

    setCardInfo((prevState) => {
      return { ...prevState, yy };
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
      formValid = formValid && false;
    }

    if (!cardInfo.number) {
      setErrCardNumber("Can't be blank");
      setShowErrCardNumber(true);
      formValid = formValid && false;
    } else if (cardInfo.number.replace(/\s/g, '').length < 16) {
      setErrCardNumber('Invalid number');
      setShowErrCardNumber(true);
      formValid = formValid && false;
    } else if (cardInfo.number.replace(/\s/g, '').match(/\D/g) != null) {
      setErrCardNumber('Wrong format, numbers only');
      setShowErrCardNumber(true);
      formValid = formValid && false;
    }

    if (!cardInfo.mm || !cardInfo.yy) {
      setErrCardDate("Can't be blank");
      setShowErrCardDate({
        mm: cardInfo.mm == '',
        yy: cardInfo.yy == '',
      });
      formValid = formValid && false;
    } else if (cardInfo.mm.length != 2 || cardInfo.yy.length != 2) {
      setErrCardDate('Wrong format');
      setShowErrCardDate({
        mm: cardInfo.mm.length != 2,
        yy: cardInfo.yy.length != 2,
      });
      formValid = formValid && false;
    } else if (cardInfo.mm < 1 || cardInfo.mm > 12) {
      setErrCardDate('Invalid month');
      setShowErrCardDate((prevState) => {
        return { ...prevState, mm: true };
      });
      formValid = formValid && false;
    } else if (cardHasExpired(cardInfo.mm, cardInfo.yy)) {
      setErrCardDate('Card has expired');
      setShowErrCardDate({ mm: true, yy: true });
      formValid = formValid && false;
    }

    if (!cardInfo.cvc) {
      setErrCvc("Can't be blank");
      setShowErrCvc(true);
      formValid = formValid && false;
    } else if (cardInfo.cvc.length < 3) {
      setErrCvc('Invalid');
      setShowErrCvc(true);
      formValid = formValid && false;
    }

    if (!formValid) return;

    // setValidCard(true);
    console.log('save');
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
          value={cardInfo.cardholderName}
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
              value={cardInfo.mm}
            />
            <input
              type="text"
              className={showErrCardDate.yy ? 'danger' : ''}
              placeholder="YY"
              maxLength={2}
              onChange={yearOnChange}
              value={cardInfo.yy}
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
            value={cardInfo.cvc}
          />
          <small>{showErrCvc && errCvc}</small>
        </div>
      </div>
      <button type="submit">Confirm</button>
    </form>
  );
}

export default Form;
