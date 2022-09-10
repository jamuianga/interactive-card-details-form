import React from 'react';
import completeIcon from '../assets/icon-complete.svg';
import css from './Done.module.scss';

function Done() {
  return (
    <div className={css.card}>
      <img src={completeIcon} alt="" />
      <h1>Thank you!</h1>
      <p>We've added your card details</p>
      <button type="button">Continue</button>
    </div>
  );
}

export default Done;
