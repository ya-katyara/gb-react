import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCx3GZeCrXKB3E0vUaBwrgaW9os_28s9hE",
  authDomain: "gb-rea.firebaseapp.com",
  projectId: "gb-rea",
  storageBucket: "gb-rea.appspot.com",
  messagingSenderId: "18146765779",
  appId: "1:18146765779:web:198f15e30a20036f1b1d26"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
