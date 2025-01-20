// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKMUphtAl9VS4zfIJgD3rA7d8HnYvBLoc",
    authDomain: "hldv-78711.firebaseapp.com",
    projectId: "hldv-78711",
    storageBucket: "hldv-78711.firebasestorage.app",
    messagingSenderId: "658464029210",
    appId: "1:658464029210:web:18e1e91c828b82b5c6efa3",
    measurementId: "G-7J92ML4GX1"
};

// Initialize Firebase
export const cong = initializeApp(firebaseConfig);
export const db = getFirestore(cong);