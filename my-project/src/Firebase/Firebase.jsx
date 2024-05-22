// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6-CYiKdrB7Mz2O_bM-EdsuL12ARGkk_Y",
  authDomain: "insurance-37bc8.firebaseapp.com",
  projectId: "insurance-37bc8",
  storageBucket: "insurance-37bc8.appspot.com",
  messagingSenderId: "86511960622",
  appId: "1:86511960622:web:06ae6d9941ea11833cd5bf",
  measurementId: "G-Z4RXN5LMJ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
