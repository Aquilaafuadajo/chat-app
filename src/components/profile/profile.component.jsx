import React from 'react';

import User from '../user/user.component';
import ProfileNav from '../profile-nav/profile-nav.component';

import './profile.styles.scss';

const Profile = () => {
  const joined = Date()
  return ( 
      <div className='profile'>
        <h1>Profile</h1>
        <User/>
        <code>joined: {joined}</code>
        <ProfileNav/>
      </div>
    );
}

export default Profile;