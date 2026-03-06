import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '@/lib/firebase'; // Assuming firebase is initialized in this file
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';

const adminApp = initializeApp({
  credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK_JSON || '{}')),
});

interface AuthenticatedRequest extends NextApiRequest {
  uid?: string;
}

export async function POST(req: AuthenticatedRequest, res: NextApiResponse) {
  const { email, password } = await req.json();

  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    // Optionally, you can handle fetching additional user data here using getAdminAuth
    const userRecord = await getAdminAuth(adminApp).getUser(userCredential.user.uid);

    res.status(200).json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      idToken,
    });
  } catch (err) {
    res.status(401).json({ error: err instanceof Error ? err.message : String(err) });
  }
}