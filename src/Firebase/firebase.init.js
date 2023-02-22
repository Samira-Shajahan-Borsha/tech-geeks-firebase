// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvQj3v2klgg1teWjQlOid5otR2juVc498",
    authDomain: "tech-geeks-firebase-402b6.firebaseapp.com",
    projectId: "tech-geeks-firebase-402b6",
    storageBucket: "tech-geeks-firebase-402b6.appspot.com",
    messagingSenderId: "583174768605",
    appId: "1:583174768605:web:db047b4307989cc4e99834"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;