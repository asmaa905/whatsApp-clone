import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwFzzL9emQ--dUtLWT7vmSVKCyAEMBTpk",
    authDomain: "whatsapp-clone-422814.firebaseapp.com",
    projectId: "whatsapp-clone-422814",
    storageBucket: "whatsapp-clone-422814.appspot.com",
    messagingSenderId: "878858859701",
    appId: "1:878858859701:web:21465248ecc09f3e363afc"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export { db }