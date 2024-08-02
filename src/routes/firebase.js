import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDH9cHwJ4D91PIu7Y8UdunIOANZZLJdzLw",
    authDomain: "purchase-log-59c67.firebaseapp.com",
    projectId: "purchase-log-59c67",
    storageBucket: "purchase-log-59c67.appspot.com",
    messagingSenderId: "513619256493",
    appId: "1:513619256493:web:ef7696ac3d7e3490815224",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
