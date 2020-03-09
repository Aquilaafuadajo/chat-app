import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {storage} from '../../firebase/firebase.utils';

import {selectCurrentUser} from '../../redux/user/users.selectors';

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
    const {currentUser} = this.props
    const image = await e.target.files[0]
    if(image) {
      this.setState({image: image})
    }
    const uploadTask = storage.ref(`images/${currentUser.id}/${image.name}`).put(image)
    // const getUrl = await storage.ref(`images/${currentUser.id}`).child(image.name).getDownloadURL()

      uploadTask.on('state_changed', 
      (snapshot) => {

      },
      (error) => {
        console.log(error)
      },
      () => {
        storage.ref(`images/${currentUser.id}`).child(image.name).getDownloadURL().then(url => {
          this.setState({url: url}, console.log(this.state.url))
        })
      }
    )
  }

  render() { 
    const {url} = this.state;
    return ( 
        <div className='form-wrap' style={{textAlign: 'center'}}>
          <div className="edit">
            <img className='svg' src={Edit} alt='edit'/>
          </div>
          <h3>Edit profile</h3>
          {
            url? 
            <div className="pa2 tc">
              <img src={url} className="br-100 h3 w3 dib" alt="avatar"/>
            </div>
            :
            <div className="avatar">
              <img src={DefaultImage} className="br-100 h3 w3 dib" alt="avatar"/>
            </div>
          }
          <CustomButton>Upload Image <img src={ComputingCloud} alt='upload' style={{height: '20px', width: '20px', marginLeft: '5px'}} /> </CustomButton>
          <UploadButton handleChange={this.handleChange}/>
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

export default connect(mapStateToProps)(EditProfile);