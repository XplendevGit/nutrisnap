import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAsUD8RuJ2mQP6XCD2b7Oa4XvzV47vh74g",
  authDomain: "nutrisnap-eb042.firebaseapp.com",
  projectId: "nutrisnap-eb042",
  storageBucket: "nutrisnap-eb042.appspot.com",
  messagingSenderId: "788967847700",
  appId: "1:788967847700:web:44cc83b38098bc9b027401",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth con persistencia
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Obtener las instancias de Auth y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
