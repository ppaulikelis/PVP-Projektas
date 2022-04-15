import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCLFOPOVW4RkXeKeQchgfqEhdilJuXWA7A',
  authDomain: 'pvp-project-a4ccc.firebaseapp.com',
  projectId: 'pvp-project-a4ccc',
  storageBucket: 'pvp-project-a4ccc.appspot.com',
  messagingSenderId: '544828563716',
  appId: '1:544828563716:web:09454e1df33af6d8107051'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
