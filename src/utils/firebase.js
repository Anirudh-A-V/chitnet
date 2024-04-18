import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8rnoF0noygkiMsFMECifVr6LloYo-19M",
  authDomain: "chit-net.firebaseapp.com",
  projectId: "chit-net",
  storageBucket: "chit-net.appspot.com",
  messagingSenderId: "515219401226",
  appId: "1:515219401226:web:5f64a1763e282953544df3",
  measurementId: "G-R1J3MTC2Z8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);