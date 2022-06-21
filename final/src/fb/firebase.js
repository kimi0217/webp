import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyCfkDXiYZoOqxrpKNVmhPl_slKnkK7VOe8",
        authDomain: "finalproject-a56ca.firebaseapp.com",
        projectId: "finalproject-a56ca",
        storageBucket: "finalproject-a56ca.appspot.com",
        messagingSenderId: "346874637556",
        appId: "1:346874637556:web:3121dc4c7435cfa61182a1"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };