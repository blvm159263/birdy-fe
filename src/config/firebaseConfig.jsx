import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDbo6xs1jnG-z3kadD83OsxlUt4iOLZyg0",
  authDomain: "birdy-36c81.firebaseapp.com",
  projectId: "birdy-36c81",
  storageBucket: "birdy-36c81.appspot.com",
  messagingSenderId: "701238184858",
  appId: "1:701238184858:web:560e38bae78e46117a8823",
  measurementId: "G-GMPVWR00V5"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore()