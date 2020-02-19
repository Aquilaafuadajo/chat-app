import React from 'react';

import Face from '../../assets/face.jpg';
import Edit from '../../assets/edit.svg';
import Bin from '../../assets/bin.svg';

import 'tachyons';
import './user.styles.scss';

const User = () => {
  return ( 
      <div className='container'>
        <div className='user'>
          <div class="pa4 tc">
            <img src={Face} className="br-100 h3 w3 dib" alt="avatar"/>
          </div>
          <div className='username'>
            <p>kathy</p>
            <p>kathy@gmail.com</p>
          </div>
        </div>
        <div className='changes'>
          <img className='svg' src={Edit} alt='edit'/>
          <img className='svg' src={Bin} alt='delete'/>
        </div>
      </div>
    );
}

export default User;