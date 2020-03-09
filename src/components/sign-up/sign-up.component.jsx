import React from 'react';

import {signInWithGoogle, auth, createProfileDocument} from '../../firebase/firebase.utils';

import Form from '../form/form.component';

class SignUp extends React.Component{
  state = {
    username: '',
    email: '',
    password: ''
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const {username, email, password} = this.state;
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password)
      createProfileDocument(user, {username})
      this.setState({
        username: '',
        email: '',
        password: ''
      })
    }catch(error) {console.log('error creating user', error.message)}
  }

  render(){
    const {username, email, password} = this.state
    return(
      <Form 
        handleChange={this.handleChange} 
        handleSubmit={this.handleSubmit}
        signInWithGoogle={signInWithGoogle}
        username={username}
        email={email}
        password={password}
        />
    )
  }
} 

export default SignUp;

