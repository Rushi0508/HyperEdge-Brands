import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "hyperedge-imf.firebaseapp.com",
  projectId: "hyperedge-imf",
  storageBucket: "hyperedge-imf.appspot.com",
  messagingSenderId: "268533652317",
  appId: "1:268533652317:web:8d00db054d19705b30a6b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
