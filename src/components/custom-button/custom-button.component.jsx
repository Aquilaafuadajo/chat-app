import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({children, handleSubmit}) => {
  return ( 
      <button onClick={handleSubmit} className='custom-button'>
        {children}
      </button>
    );
}

export default CustomButton;