// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import firebase from "firebase";
import  firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuucI5x3I58KKzDBFRQq0BUKPEa0TbtZ8",
  authDomain: "instagram-clone-10c6a.firebaseapp.com",
  projectId: "instagram-clone-10c6a",
  storageBucket: "instagram-clone-10c6a.appspot.com",
  messagingSenderId: "531907735328",
  appId: "1:531907735328:web:868a7f068c04ecb8c37145"
}

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export {firebase, db}
