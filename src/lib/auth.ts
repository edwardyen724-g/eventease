import { getAuth as firebaseGetAuth } from 'firebase-admin/auth';

export const getAuth = () => firebaseGetAuth();