
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx1SodN-_ZGyFRBqFH4Gn1Novfc_FXsI0",
  authDomain: "web-weather-afd5b.firebaseapp.com",
  projectId: "web-weather-afd5b",
  storageBucket: "web-weather-afd5b.appspot.com",
  messagingSenderId: "981069127135",
  appId: "1:981069127135:web:f9ceabd7f5262d3ffd386a",
  measurementId: "G-EJP29YG7W4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
