import React from 'react';
import {Link} from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './form.styles.scss';

const Form = ({isSignIn, username, password, email, handleSubmit, signInWithGoogle, handleChange}) => {
  return ( 
      <div className='form-wrap'>
        {
          isSignIn? 
            <div>
              <h2>Login</h2>
              <form className='form' onSubmit={handleSubmit}>
                <FormInput isForm required handleChange={handleChange} value={username} type='username' name='username' placeholder='Username' />
                <FormInput isForm required handleChange={handleChange} value={password} type='password' name='password' placeholder='Password'  />
                <CustomButton handleSubmit={handleSubmit} type='submit'>Sign in</CustomButton>
                <Link className='form-link' to='/signup'><p> Don't have an account? Register </p></Link>
              </form>
            </div>
            : 
            <div>
              <h2>Sign up</h2>
              <form className='form' onSubmit={handleSubmit}>
                <FormInput isForm required handleChange={handleChange} value={username} type='name' name='username' placeholder='Username' />
                <FormInput isForm required handleChange={handleChange} value={email} type='email' name='email' placeholder='Email' />
                <FormInput isForm required handleChange={handleChange} value={password} type='password' name='password' placeholder='Password' />
                <CustomButton handleSubmit={handleSubmit} type='submit'>Sign up</CustomButton>
                <p className='form-link' style={{cursor:'pointer'}} onClick={signInWithGoogle}>Sign in with google?</p>
              </form>
            </div>
        }
      </div>
    );
}

export default Form;