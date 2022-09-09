import React, { useState } from 'react';
import './Form.scss';

function Form({ cardInfo, setCardInfo }) {
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

  return (
    <form>
      <div className="form-group">
        <label>Cardholder name</label>
        <input
          type="text"
          placeholder="e.g. Jane Appleseed"
          onChange={cardholderNameOnChange}
        />
        <small className="error-msg"></small>
      </div>
      <div className="form-group">
        <label htmlFor="">Card number</label>
        <input
          type="tel"
          placeholder="e.g. 1234 5678 9123 0000"
          onChange={cardNumberonChange}
          value={cardInfo.number}
        />
        <small className="error-msg"></small>
      </div>
      <div className="inline-form-group">
        <div className="form-group">
          <label htmlFor="">Exp. Date (mm/yy)</label>
          <div className="inline-input expire-date">
            <input type="text" placeholder="MM" maxLength={2} />
            <input type="text" placeholder="YY" maxLength={2} />
          </div>
          <small className="error-msg"></small>
        </div>
        <div className="form-group">
          <label>cvc</label>
          <input
            type="text"
            placeholder="e.g. 123"
            className="cvc"
            maxLength={3}
            onChange={cvcOnChange}
          />
          <small className="error-msg"></small>
        </div>
      </div>
      <button>Confirm</button>
    </form>
  );
}

export default Form;
