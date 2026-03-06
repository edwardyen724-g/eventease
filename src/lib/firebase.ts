import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase configuration object
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createUserWithEmailAndPassword = (email: string, password: string) => {
  return firebaseCreateUserWithEmailAndPassword(auth, email, password);
};