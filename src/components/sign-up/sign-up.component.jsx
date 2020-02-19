import React from 'react';

import {signInWithGoogle} from '../../firebase/firebase.utils';

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

  handleSubmit = () => {
    console.log(this.state.username)
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

