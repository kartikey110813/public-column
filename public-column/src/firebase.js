import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    
        apiKey: "AIzaSyDCwSYT_vQjaJrxT3KojX2PYzU0QvF-pt0",
    authDomain: "public-column.firebaseapp.com",
    databaseURL: "https://public-column.firebaseio.com",
    projectId: "public-column",
    storageBucket: "public-column.appspot.com",
    messagingSenderId: "581608610394",
    appId: "1:581608610394:web:d9848a57d91942602fd663",
    measurementId: "G-DKQRE8LRHF"
      
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage  = firebase.storage();

export {db,auth,storage};



//  export default db;