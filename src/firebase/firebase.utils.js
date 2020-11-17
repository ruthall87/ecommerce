import firebase from 'firebase/app';
import 'firebase/firestore';
import  'firebase/auth'


const config ={
        apiKey: "AIzaSyDT-e5VI3TNz7Nifpp1X3E3Qe5OyaLDTsg",
        authDomain: "crown-db-f0ba5.firebaseapp.com",
        databaseURL: "https://crown-db-f0ba5.firebaseio.com",
        projectId: "crown-db-f0ba5",
        storageBucket: "crown-db-f0ba5.appspot.com",
        messagingSenderId: "70503959691",
        appId: "1:70503959691:web:8aba842573bfd0de96588e",
        measurementId: "G-88GHSRY0R8"
      
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
