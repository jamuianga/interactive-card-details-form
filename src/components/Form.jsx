import React from 'react';

function Form() {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="">Cardholder name</label>
        <input type="text" placeholder="e.g. Jane Appleseed" />
        <small className="error-msg"></small>
      </div>
      <div className="form-group">
        <label htmlFor="">Card number</label>
        <input type="text" placeholder="e.g. 1234 5678 9123 0000" />
        <small className="error-msg"></small>
      </div>
      <div className="inline-form-group">
        <div className="form-group">
          <label htmlFor="">Exp. Date (mm/yy)</label>
          <div className="inline-input">
            <input type="text" name="" id="" placeholder="MM" />
            <input type="text" name="" id="" placeholder="YY" />
          </div>
          <small className="error-msg"></small>
        </div>
        <div className="form-group">
          <label htmlFor="">cvc</label>
          <input type="text" placeholder="e.g. 123" />
          <small className="error-msg"></small>
        </div>
      </div>
      <button>Confirm</button>
    </form>
  );
}

export default Form;
