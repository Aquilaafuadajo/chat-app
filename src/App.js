import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import {auth} from './firebase/firebase.utils';

import NavBar from './components/nav-bar/nav-bar.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';
import Profile from './components/profile/profile.component';

import './App.css';

class App extends React.Component {
  state = {
    currentUser: null
  }

  unSubscribeFromAuth = null

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async user => {
      this.setState({currentUser: user})
    })
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth()
  }


  render() {
    const {currentUser} = this.state
    return (
      <div className="App">
        <NavBar currentUser={currentUser}/>
        <Switch>
          <Route exact path='/' render={() => currentUser? <Redirect to='/profile'/> : <SignIn /> }/>
          <Route exact path='/signup' render={() => currentUser? <Redirect to='/profile'/> : <SignUp /> }/>
          <Route exact path='/profile' render={() => currentUser? <Profile /> : <Redirect to='/'/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
