// // firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4lmmwAGbERteMTD3bjLAONVk-FVm7O6M",
  authDomain: "sigmaty-73444.firebaseapp.com",
  projectId: "sigmaty-73444",
  storageBucket: "sigmaty-73444.appspot.com",
  messagingSenderId: "1080933464873",
  appId: "1:1080933464873:web:e5906faabe0e69dfa7d538"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db, collection };

// const firebaseConfig = {
//   apiKey: "AIzaSyD8QGfWGqxNf9b2Vp2e5mvUH1BNnRkIeog",
//   authDomain: "sigmaty-9796c.firebaseapp.com",
//   projectId: "sigmaty-9796c",
//   storageBucket: "sigmaty-9796c.appspot.com",
//   messagingSenderId: "188909474471",
//   appId: "1:188909474471:web:5dc9e8500fb4306e638182"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);

// export { auth, db, collection };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
