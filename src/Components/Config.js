// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth" 
import {getFirestore} from "firebase/firestore"
import {getStorage,ref} from "firebase/storage";






// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgFmhwvog-muAjasrIcksZL_jAEmBRDps",
  authDomain: "ecommerce-14aba.firebaseapp.com",
  projectId: "ecommerce-14aba",
  storageBucket: "ecommerce-14aba.appspot.com",
  messagingSenderId: "314622302400",
  appId: "1:314622302400:web:9d9995c8bde5fbe1b2f525"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const fs=getFirestore(app);
const storage=getStorage(app)


export{auth,fs,storage};