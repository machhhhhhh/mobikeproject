import * as  firebase from 'firebase'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBBGWSSnRXI1MTC0JfPaxE1bSflfC1bj5A",
    authDomain: "smartrepairshop-3a025.firebaseapp.com",
    databaseURL: "https://smartrepairshop-3a025.firebaseio.com",
    projectId: "smartrepairshop-3a025",
    storageBucket: "smartrepairshop-3a025.appspot.com",
    messagingSenderId: "1063342171617",
    appId: "1:1063342171617:web:0d74eabe321f5288085ea0",
    measurementId: "G-Z52GCK58WT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  export const f = firebase
  export const database = firebase.database()
  export const auth = firebase.auth()
  export const storage = firebase.storage()