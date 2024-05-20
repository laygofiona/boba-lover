import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Add Firebase config Data Here

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();

// Export the variable you need access to later
export default database;