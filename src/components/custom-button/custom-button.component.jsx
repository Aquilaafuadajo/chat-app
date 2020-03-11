import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({children, handleSubmit, style}) => {
  return ( 
      <button onClick={handleSubmit} className={`custom-button`} style={style}> 
        {children}
      </button>
    );
}

export default CustomButton;