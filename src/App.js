import React from 'react';
import {Route} from 'react-router-dom';

import NavBar from './components/nav-bar/nav-bar.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';
// import TextInput from './components/text-input/text-input.component';
import Profile from './components/profile/profile.component';

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Route exact path='/profile' component={Profile}/>
      <Route exact path='/signin' component={SignIn}/>
      <Route exact path='/sign-up' component={SignUp}/>
    </div>
  );
}

export default App;
