// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "todoapp-b8d81.firebaseapp.com",
  projectId: "todoapp-b8d81",
  storageBucket: "todoapp-b8d81.appspot.com",
  messagingSenderId: "783717395174",
  appId: "1:783717395174:web:7fca36155602eb7a58a927"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

