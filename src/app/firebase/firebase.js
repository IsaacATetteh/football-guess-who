"use client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDidp-ySYo-qF5eUS9Z1FLFnItEenMN2yY",
  authDomain: "football-game-fc44d.firebaseapp.com",
  projectId: "football-game-fc44d",
  storageBucket: "football-game-fc44d.appspot.com",
  messagingSenderId: "869408330053",
  appId: "1:869408330053:web:f2a6630c7a47bf19ddee2c",
  measurementId: "G-HHYZ0S073E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));

export { app, auth, db };
