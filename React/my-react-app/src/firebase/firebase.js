import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import 'firebase/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyB5wa-4OXAacsozwz5dVnJOX2Oshp3MjPA",
  authDomain: "task4-64f6a.firebaseapp.com",
  projectId: "task4-64f6a",
  storageBucket: "task4-64f6a.appspot.com",
  messagingSenderId: "1052133252142",
  appId: "1:1052133252142:web:6f1359788049b2a91413bf",
  measurementId: "G-B32XRGZ6L3"
};

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase,"gs://task4-64f6a.appspot.com");
console.log(storage);

export { storage, firebase as default }