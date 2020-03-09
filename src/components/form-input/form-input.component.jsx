import React from 'react';


import './form-input.styles.scss';

const FormInput = ({handleChange, isForm, label, ...otherProps}) => {
  return ( 
    <>
      {
        isForm? 
        <input className='is-form' onChange={handleChange} {...otherProps}/>
        :
        <div className='group'>
        <input className='form-input' onChange={handleChange} {...otherProps}/>
        {
          label?
          (<label className={`${otherProps.value.length? 'shrink' : ''} form-input-label`}>
          {label}
          </label>) 
          :
          null
        }
      </div>
      }
    </>
  );
}

export default FormInput;