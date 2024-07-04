import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import{getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC1LigMt_RF7tkaDMoqnnoWecvav4ACktw",
  authDomain: "react-firebase-20503.firebaseapp.com",
  projectId: "react-firebase-20503",
  storageBucket: "react-firebase-20503.appspot.com",
  messagingSenderId: "373874507892",
  appId: "1:373874507892:web:2ee7eda7f81603a69dd121",
  measurementId: "G-KTXCVFP5L2"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export{db, auth}