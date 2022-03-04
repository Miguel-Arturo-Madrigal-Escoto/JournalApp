// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2zsZ1wvztVIhNgYTqGxfNd2vP5UhvKn4",
  authDomain: "journal-app-93d84.firebaseapp.com",
  projectId: "journal-app-93d84",
  storageBucket: "journal-app-93d84.appspot.com",
  messagingSenderId: "10318008127",
  appId: "1:10318008127:web:5d3a86c1b422522001cd8a",
  measurementId: "G-C76978R0LM"
};

// Base de datos
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore();

// Autenticación con Google
const googleAuthProvider = new GoogleAuthProvider();

export {
    db, 
    googleAuthProvider,
}