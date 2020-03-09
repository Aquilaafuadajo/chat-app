import React from 'react';
import {connect} from 'react-redux';

import {auth} from '../../firebase/firebase.utils';

import './nav-bar.styles.scss';



const NavBar = (props) => {
  const {currentUser} = props
  return (
    <nav className='main-nav'>
      <h1>HeaderIcon</h1>
      <p><span>Profile</span>{currentUser? <span onClick={ () => auth.signOut()}>Sign out</span> : ''} </p>
    </nav>
  )
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default connect(mapStateToProps)(NavBar);