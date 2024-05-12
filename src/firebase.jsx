import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQ8AKU9pHV4675eOrhhNnLL87z7Va0p5E",
    authDomain: "bobalover-fcb91.firebaseapp.com",
    projectId: "bobalover-fcb91",
    storageBucket: "bobalover-fcb91.appspot.com",
    messagingSenderId: "1965975289",
    appId: "1:1965975289:web:590937d0a5a9ecfa30a428",
    measurementId: "G-Z4N9TRKMSC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();

// Export the variable you need access to later
export default database;