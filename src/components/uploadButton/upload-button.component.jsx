import React from 'react';

import './upload-button.styles.scss';

const UploadButton = ({handleChange, handleClick, ...otherProps}) => {
  return ( 
    <input className='profile-img-upload' onClick={handleClick} onChange={handleChange} type='file' {...otherProps} />
    );
}

export default UploadButton;