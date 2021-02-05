import * as firebase from 'firebase'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfksVWsNA3HveAed4ckuU6AdMbfL1akOY",
    authDomain: "ecommerce-ab8b0.firebaseapp.com",
    projectId: "ecommerce-ab8b0",
    storageBucket: "ecommerce-ab8b0.appspot.com",
    messagingSenderId: "632379551624",
    appId: "1:632379551624:web:122082e87207e56f80143d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()