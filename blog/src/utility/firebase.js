import firebase from 'firebase';

/*

741438152993-dis9p5vrtvkdktibq05c45rgpt83uqf3.apps.googleusercontent.com     id client web

V1hysnnN4qh5klgugV5099SM client secret

let provider = new firebase.auth.GoogleAuthProvider();




<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration


    // Initialize Firebase

  firebase.analytics();
</script>

  */
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
