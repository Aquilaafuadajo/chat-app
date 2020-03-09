import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {auth} from './firebase/firebase.utils';
import {createProfileDocument} from './firebase/firebase.utils';

import {setCurrentUser} from './redux/user/user.action';
import {selectCurrentUser} from './redux/user/users.selectors';

import NavBar from './components/nav-bar/nav-bar.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';
import Profile from './components/profile/profile.component';
import EditProfile from './pages/edit-profile/edit-profile.component';

import './App.css';

class App extends React.Component {

  unSubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              // photoUrl: userAuth.photoURL,
              id: snapShot.id,
              ...snapShot.data()
          })
        }) ;
      }else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth()
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' render={() => this.props.currentUser? <Redirect to='/profile'/> : <SignIn /> }/>
          <Route exact path='/signup' render={() => this.props.currentUser? <Redirect to='/profile'/> : <SignUp /> }/>
          <Route exact path='/profile' render={() => this.props.currentUser? <Profile /> : <Redirect to='/'/>}/>
          <Route exact path='/edit-profile' component={EditProfile}></Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToprops = createStructuredSelector({
  currentUser: selectCurrentUser
})


const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToprops, mapDispatchToProps)(App);
