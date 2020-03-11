import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {firestore} from '../../firebase/firebase.utils';
import {storage} from '../../firebase/firebase.utils';

import {selectCurrentUser} from '../../redux/user/users.selectors';
import {setCurrentUser} from '../../redux/user/user.action';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import UploadButton from '../../components/uploadButton/upload-button.component';

import Edit from '../../assets/edit.svg';
import DefaultImage from '../../assets/user.svg';
import ComputingCloud from '../../assets/computing-cloud.svg';

import './edit-profile.styles.scss';

class EditProfile extends React.Component {
  state = { 
      image: null,
      username: '',
      bio: ''
    }

  handleChange= async (e) => {
    const {currentUser} = this.props
    const image = await e.target.files[0]
    if(image) {
      this.setState({image: image})
    }
    const uploadTask = storage.ref(`images/${currentUser.id}/${image.name}`).put(image)

      uploadTask.on('state_changed', 
      (snapshot) => {

      },
      (error) => {
        console.log(error)
      },
      () => {
        storage.ref(`images/${currentUser.id}`).child(image.name).getDownloadURL().then(url => {
          const userRef = firestore.doc(`users/${currentUser.id}`)
          userRef.update({photoURL: url})
          this.setState({url: currentUser.photoURL}, console.log(this.state.url))
        })
      }
    )
  }

  handleTextInput = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  handleSubmit = () => {
    const {username, bio} = this.state;
    const {currentUser} = this.props
    const userRef = firestore.doc(`users/${currentUser.id}`)
    userRef.update({
      username,
      bio
    })
    this.setState({
      username: '',
      bio: ''
    })
  }

  render() { 
    const {currentUser} = this.props;
    return ( 
        <div className='form-wrap' style={{textAlign: 'center'}}>
          <div className="edit">
            <img className='svg' src={Edit} alt='edit'/>
          </div>
          <h3>Edit profile</h3>
          {
            currentUser? 
            <div className="pa2 tc"> 
              <img src={currentUser.photoURL} className="br-100 h3 w3 dib" alt="avatar"/>
            </div>
            :
            <div className="avatar">
              <img src={DefaultImage} className="br-100 h3 w3 dib" alt="avatar"/>
            </div>
          }
          
            <CustomButton>Upload Image <img src={ComputingCloud} alt='upload' style={{height: '20px', width: '20px', marginLeft: '5px'}} /> </CustomButton>
            <UploadButton style={{position: 'relative', top: '-42px', opacity: '0'}} handleChange={this.handleChange}/>
          
          <FormInput type='text' name='username' placeholder='Name' onChange={this.handleTextInput} />
          <FormInput type='text' name='bio' placeholder='Bio' onChange={this.handleTextInput} />
          <CustomButton handleSubmit={this.handleSubmit} style={{backgroundColor: '#4fa791'}}>SAVE</CustomButton>
        </div>
      );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);