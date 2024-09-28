// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy2dohu1ldjKHqjUEJa2Faws1lJrgs_Q4",
  authDomain: "finance-manager-app-54fe3.firebaseapp.com",
  projectId: "finance-manager-app-54fe3",
  storageBucket: "finance-manager-app-54fe3.appspot.com",
  messagingSenderId: "949623520409",
  appId: "1:949623520409:web:507c3a709e7d29af29cc08"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;