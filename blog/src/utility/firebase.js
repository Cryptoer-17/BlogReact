import firebase from 'firebase';

   const firebaseConfig = {
    apiKey: "AIzaSyDGI-n4ck_c8QjD1hxtunkeLDaGZRLGnrU",
    authDomain: "blog-monika-andrea.firebaseapp.com",
    databaseURL: "https://blog-monika-andrea.firebaseio.com",
    projectId: "blog-monika-andrea",
    storageBucket: "blog-monika-andrea.appspot.com",
    messagingSenderId: "741438152993",
    appId: "1:741438152993:web:6c72604c4df16b241e1e60",
    measurementId: "G-ZW11BD5KJ8"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default fire;
