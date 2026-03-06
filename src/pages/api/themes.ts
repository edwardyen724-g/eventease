import { NextApiRequest, NextApiResponse } from 'next';
import { getFirebaseAdmin } from '../../../lib/firebaseAdmin';
import { firestore } from 'firebase-admin';

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string }; // Example user property added for authentication
}

const themesCollection = 'themes';

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  const firebaseAdmin = getFirebaseAdmin();
  
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const themesSnapshot = await firebaseAdmin.firestore().collection(themesCollection).get();
    const themes = themesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return res.status(200).json(themes);
  } catch (err) {
    console.error('Error fetching themes:', err);
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}