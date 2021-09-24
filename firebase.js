import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDtTAOe0_8a0wYm259AiV8QCCXVDBfgtAY",
  authDomain: "uber-eats-fb284.firebaseapp.com",
  projectId: "uber-eats-fb284",
  storageBucket: "uber-eats-fb284.appspot.com",
  messagingSenderId: "463594358290",
  appId: "1:463594358290:web:2d738b4b39103d59bf3acb",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const auth = app.auth();

export default firebase;
