import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = {
  // Initialize with your Firebase Admin SDK credentials
  type: process.env.FIREBASE_TYPE,
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_CLIENT_ID,
  authUri: process.env.FIREBASE_AUTH_URI,
  tokenUri: process.env.FIREBASE_TOKEN_URI,
  authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  clientC509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

if (!admin.apps.length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string };
}

const rateLimitMap = new Map<string, number>();

async function getEvents(req: AuthedRequest, res: NextApiResponse) {
  try {
    const eventsSnapshot = await db.collection('events').get();
    const events = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}

async function createEvent(req: AuthedRequest, res: NextApiResponse) {
  try {
    const eventData = req.body;
    const eventRef = await db.collection('events').add(eventData);
    res.status(201).json({ id: eventRef.id, ...eventData });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getEvents(req, res);
  }

  if (req.method === 'POST') {
    const requestKey = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (requestKey) {
      const currentCount = rateLimitMap.get(requestKey) || 0;
      if (currentCount >= 5) {
        return res.status(429).json({ error: 'Too many requests' });
      }
      rateLimitMap.set(requestKey, currentCount + 1);
      setTimeout(() => {
        rateLimitMap.set(requestKey, currentCount); // Reset count after 1 minute
      }, 60000);
    } else {
      return res.status(400).json({ error: 'Request origin missing' });
    }

    return createEvent(req, res);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}