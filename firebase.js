import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyB61-BOFGQ3yq3F1RYL3hXHnoQCUF3vULU",
    authDomain: "linkup-f5ffe.firebaseapp.com",
    projectId: "linkup-f5ffe",
    storageBucket: "linkup-f5ffe.appspot.com",
    messagingSenderId: "603021762142",
    appId: "1:603021762142:web:ddb14564d6f980ca391ecf",
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
