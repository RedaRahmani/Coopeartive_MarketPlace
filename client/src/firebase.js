// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-stack-marketplace.firebaseapp.com",
  projectId: "mern-stack-marketplace",
  storageBucket: "mern-stack-marketplace.appspot.com",
  messagingSenderId: "530391671925",
  appId: "1:530391671925:web:d679004868f4d6c643043c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);