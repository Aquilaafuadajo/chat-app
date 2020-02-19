import React from 'react';

import Form from '../form/form.component';

class SignIn extends React.Component {
  state = {
    username: '',
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
    const {username, password} = this.state
    return (
      <Form 
        username={username} 
        password={password} 
        handleChange={this.handleChange} 
        handleSubmit={this.handleSubmit}
        isSignIn
        />
    )
  }
}

export default SignIn;