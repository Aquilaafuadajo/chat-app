import React from 'react';

import {auth} from '../../firebase/firebase.utils';

import Form from '../form/form.component';

class SignIn extends React.Component {
  state = {
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
    const {email, password} = this.state
    auth.signInWithEmailAndPassword(email, password)
  }

  render(){
    const {email, password} = this.state
    return (
      <Form 
        email={email} 
        password={password} 
        handleChange={this.handleChange} 
        handleSubmit={this.handleSubmit}
        isSignIn
        />
    )
  }
}

export default SignIn;