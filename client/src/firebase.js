// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-47864.firebaseapp.com",
  projectId: "mern-estate-47864",
  storageBucket: "mern-estate-47864.appspot.com",
  messagingSenderId: "1005270792604",
  appId: "1:1005270792604:web:8838ea74aaec1e39dc7059",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
