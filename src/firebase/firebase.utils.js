import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDmElvU33KZD8zyFV9GtXMYbK_ua1_72MY",
  authDomain: "crwn-db-8c5d4.firebaseapp.com",
  databaseURL: "https://crwn-db-8c5d4.firebaseio.com",
  projectId: "crwn-db-8c5d4",
  storageBucket: "crwn-db-8c5d4.appspot.com",
  messagingSenderId: "81589642987",
  appId: "1:81589642987:web:050672c4e405e6b6c3c0ae",
  measurementId: "G-3Q6DYDDHDE"
};

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
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
