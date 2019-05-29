const firebase = require("firebase/app");
require("firebase/auth");
//require("firebase/database");
require("firebase/firestore");
require("firebase/storage");
//require("firebase/messaging");
//require("firebase/functions");
var firebaseConfig = {
    apiKey: "AIzaSyDFp7UMs9Kus0ubGR_jRUo9dYAsqgYt2vw",
    authDomain: "thecocktail-d649e.firebaseapp.com",
    databaseURL: "https://thecocktail-d649e.firebaseio.com",
    projectId: "thecocktail-d649e",
    storageBucket: "thecocktail-d649e.appspot.com",
    messagingSenderId: "717328001386",
    appId: "1:717328001386:web:209f1ed143c7c8c1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {
    firebase,
    db,
    auth,
    storage
}