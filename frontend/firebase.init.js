// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCW1TF9cY5av9v_wBKPW7oHhs3zgp8Eu-8",
    authDomain: "crowdcube-1249a.firebaseapp.com",
    projectId: "crowdcube-1249a",
    storageBucket: "crowdcube-1249a.firebasestorage.app",
    messagingSenderId: "789909862519",
    appId: "1:789909862519:web:ffe0d0fa67d06448802e72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;