import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsUD8RuJ2mQP6XCD2b7Oa4XvzV47vh74g",
    authDomain: "nutrisnap-eb042.firebaseapp.com",
    projectId: "nutrisnap-eb042",
    storageBucket: "nutrisnap-eb042.appspot.com",
    messagingSenderId: "788967847700",
    appId: "1:788967847700:web:44cc83b38098bc9b027401"
  };

  const app = initializeApp(firebaseConfig); // Asegúrate de pasar firebaseConfig aquí

  export const auth = getAuth(app);
  export const functions = getFunctions(app);
  export default app;