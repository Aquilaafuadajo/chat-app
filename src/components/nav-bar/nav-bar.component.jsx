import React from 'react';

import {auth} from '../../firebase/firebase.utils';

import './nav-bar.styles.scss';



const NavBar = ({currentUser}) => {
  return (
    <nav className='main-nav'>
      <h1>HeaderIcon</h1>
      <p><span>Profile</span>{currentUser? <span onClick={ () => auth.signOut()}>Sign out</span> : ''} </p>
    </nav>
  )
}

export default NavBar;