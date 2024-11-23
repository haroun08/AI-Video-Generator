// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "replanto.firebaseapp.com",
  databaseURL: "https://replanto-default-rtdb.firebaseio.com",
  projectId: "replanto",
  storageBucket: "replanto.appspot.com",
  messagingSenderId: "1051656917820",
  appId: "1:1051656917820:web:b2c4ac028ac7e369728439"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);