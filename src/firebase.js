// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA98p_Y0ALoIRcFQNetYXk2u9QOdY98adA",
    authDomain: "reviveatuic-website.firebaseapp.com",
    projectId: "reviveatuic-website",
    storageBucket: "reviveatuic-website.firebasestorage.app",
    messagingSenderId: "593524114470",
    appId: "1:593524114470:web:98801f3fd5f19331b052e7",
    measurementId: "G-JGCKN5BBV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const login = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);