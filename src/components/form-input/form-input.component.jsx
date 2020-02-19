import React from 'react';

import './form-input.styles.scss';

const FormInput = ({handleChange, isForm, ...otherProps}) => {
  return ( 
    <input className={isForm? 'is-form': 'normal-input'} onChange={handleChange} {...otherProps}/>
  );
}

export default FormInput;