// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";


// Add SDKs for Firebase products here


// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCc1seSl8Hin5VyPRQ8ZhwYmE8G803VbxM",
  authDomain: "hosting-a307f.firebaseapp.com",
  projectId: "hosting-a307f",
  storageBucket: "hosting-a307f.firebasestorage.app",
  messagingSenderId: "328282784973",
  appId: "1:328282784973:web:84dda75aaed3b46284d584",
  measurementId: "G-W377VT3RK7"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Set persistence to local
await setPersistence(auth, browserLocalPersistence)

export { auth };
