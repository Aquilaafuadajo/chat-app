import React from 'react';

import uploadImage from '../../firebase/firebase.utils';

import UserProfile from '../user-profile/user-profile.component';
import ProfileNav from '../profile-nav/profile-nav.component';

import './profile.styles.scss';

class Profile extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    uploadImage()
}

  render(){
    const joined = Date()
    return ( 
      <div className='profile'>
        <h1>Profile</h1>
        <UserProfile/>
        <code>joined: {joined}</code>
        <ProfileNav/>
      </div>
    );
  }
}

export default Profile;