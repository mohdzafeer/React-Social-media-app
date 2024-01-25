// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0bxI7Lj3aU2EeVB93Xn9ShmCOLd0r3oI",
  authDomain: "react-social-media-app-2a2d8.firebaseapp.com",
  projectId: "react-social-media-app-2a2d8",
  storageBucket: "react-social-media-app-2a2d8.appspot.com",
  messagingSenderId: "728150953252",
  appId: "1:728150953252:web:7593dd37609c814c3a77b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();

export const database = getFirestore(app);