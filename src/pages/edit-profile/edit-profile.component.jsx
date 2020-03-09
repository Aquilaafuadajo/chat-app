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
      url: ''
    }

  handleChange= async (e) => {
    const {currentUser, setCurrentUser} = this.props
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
          // setCurrentUser({
          //   photoUrl: url
          // })
          this.setState({url: url})
        })
      }
    )
  }

  render() { 
    const {url} = this.state;
    const {currentUser} = this.props;
    return ( 
        <div className='form-wrap' style={{textAlign: 'center'}}>
          <div className="edit">
            <img className='svg' src={Edit} alt='edit'/>
          </div>
          <h3>Edit profile</h3>
          {
            currentUser.photoURL? 
            <div className="pa2 tc">
              <img src={currentUser.photoURL} className="br-100 h3 w3 dib" alt="avatar"/>
            </div>
            :
            <div className="avatar">
              <img src={DefaultImage} className="br-100 h3 w3 dib" alt="avatar"/>
            </div>
          }
          
            <CustomButton>Upload Image <img src={ComputingCloud} alt='upload' style={{height: '20px', width: '20px', marginLeft: '5px'}} /> </CustomButton>
            <UploadButton style={{color: 'blue', position: 'relative', top: '-42px', opacity: '0'}} handleChange={this.handleChange}/>
          
          <FormInput type='text' name='name' placeholder='Name' />
          <FormInput type='text' name='about' placeholder='About' />
          <FormInput type='email' name='email' placeholder='Email' />
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