import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "",
  authDomain: "duplom-6a9d0.firebaseapp.com",
  projectId: "duplom-6a9d0",
  storageBucket: "duplom-6a9d0.appspot.com",
  messagingSenderId: "279541310844",
  appId: "1:279541310844:web:31518bf06099b2955670f9",
  measurementId: "G-M0TJ8V14DN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
