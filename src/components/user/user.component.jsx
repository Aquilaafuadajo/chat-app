import React from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Edit from '../../assets/edit.svg';
import Bin from '../../assets/bin.svg';

import 'tachyons';
import './user.styles.scss';
import { selectCurrentUser } from '../../redux/user/users.selectors';

const User = ({currentUser}) => {
  return ( 
      <div className='container'>
        <div className='user'>
          <div className="pa4 tc">
            <img src={currentUser.photoURL} className="br-100 h3 w3 dib" alt="avatar"/>
          </div>
          <div className='username'>
            <p>kathy</p>
            <p>kathy@gmail.com</p>
          </div>
        </div>
        <div className='changes'>
          <Link to='edit-profile'><img style={{fill: '#4fa791'}} className='svg' src={Edit} alt='edit'/></Link>
          <img className='svg' src={Bin} alt='delete'/>
        </div>
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(User);