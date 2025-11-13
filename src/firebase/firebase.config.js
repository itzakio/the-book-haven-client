// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDipd-PKSOv6V_h-HkwVvolZ1QF8S2r-PY",
  authDomain: "the-book-haven-c4496.firebaseapp.com",
  projectId: "the-book-haven-c4496",
  storageBucket: "the-book-haven-c4496.firebasestorage.app",
  messagingSenderId: "344393137218",
  appId: "1:344393137218:web:8f6dd07cb587e0fc4ac1db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);