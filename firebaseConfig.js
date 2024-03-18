
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcR9tNjuokqrTJinqCrJloYsRHqDIE1mg",
    authDomain: "p2pai-project.firebaseapp.com",
    projectId: "p2pai-project",
    storageBucket: "p2pai-project.appspot.com",
    messagingSenderId: "57062112348",
    appId: "1:57062112348:web:0244711dc0789aa2153a99",
    storageBucket: "gs://p2pai-project.appspot.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();

