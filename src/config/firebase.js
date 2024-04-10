// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDKJde4HfxdJcaotLAbkpB5KiSN5SN4p7o",
//   authDomain: "cortexsurvey-a4219.firebaseapp.com",
//   projectId: "cortexsurvey-a4219",
//   storageBucket: "cortexsurvey-a4219.appspot.com",
//   messagingSenderId: "607286132412",
//   appId: "1:607286132412:web:088d5f8e752e087460dab9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize database
// export const db = getDatabase(app);



import { initializeApp } from "firebase/app";;
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDKJde4HfxdJcaotLAbkpB5KiSN5SN4p7o",
  authDomain: "cortexsurvey-a4219.firebaseapp.com",
  projectId: "cortexsurvey-a4219",
  storageBucket: "cortexsurvey-a4219.appspot.com",
  messagingSenderId: "607286132412",
  appId: "1:607286132412:web:088d5f8e752e087460dab9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
export const db = getDatabase(app);