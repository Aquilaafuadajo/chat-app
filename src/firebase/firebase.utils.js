import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD8kwO-rMzsrUhNrOL9Ig-TwtdJrnQusaE",
  authDomain: "react-chat-app-618b9.firebaseapp.com",
  databaseURL: "https://react-chat-app-618b9.firebaseio.com",
  projectId: "react-chat-app-618b9",
  storageBucket: "react-chat-app-618b9.appspot.com",
  messagingSenderId: "713967196169",
  appId: "1:713967196169:web:9aaa1721dbaf8971da00d8",
  measurementId: "G-E68NNBZN05"
};

firebase.initializeApp(config);

export const createProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
  

  if(!snapShot.exists) {
    const {displayName, email, photoURL} = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        username: displayName,
        email,
        createdAt,
        photoURL,
        ...additionalData
      })
    }catch(error) {console.log('error creating user', error.message)}
  }
  return userRef;
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage()


export default firebase;