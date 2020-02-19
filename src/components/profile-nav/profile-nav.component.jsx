import React from 'react';

import './profile-nav.styles.scss';

const ProfileNav = () => {
  return ( 
      <nav className='profile-nav'>
        <p>POSTS</p>
        <p>FOLLOWING</p>
        <p>FOLLOWERS</p>
      </nav>
    );
}

export default ProfileNav;