import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp } from 'firebase-admin/app';
import { setLoginSession } from '../../../lib/auth'; // Assume you have a utility to set login sessions
import { setRateLimit } from '../../../lib/rateLimit'; // Assume you have a utility to handle rate limiting

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string; email: string }; // Extend request to include user information
}

initializeApp({
  credential: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const rateLimit = new Map<string, number>();

const loginHandler = async (req: AuthedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const rateLimitKey = req.ip; // or any key that makes sense for your rate limiting
  const rateLimitCount = rateLimit.get(rateLimitKey) || 0;

  if (rateLimitCount >= 5) {
    return res.status(429).json({ message: 'Too many requests' });
  }

  rateLimit.set(rateLimitKey, rateLimitCount + 1);

  const { email, password } = req.body;

  try {
    const user = await getAuth().getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Logic to validate password using Auth0 or a similar service

    await setLoginSession(res, { uid: user.uid, email: user.email });
    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default loginHandler;