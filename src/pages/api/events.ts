import { NextApiRequest, NextApiResponse } from 'next';
import { firestore } from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK as string);
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string; email: string };
}

const events: { [key: string]: any } = new Map();

const handleGet = async (req: AuthedRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    if (id) {
      const eventRef = db.collection('events').doc(id as string);
      const eventDoc = await eventRef.get();

      if (!eventDoc.exists) {
        return res.status(404).json({ error: 'Event not found' });
      }

      return res.status(200).json(eventDoc.data());
    }

    const eventsSnapshot = await db.collection('events').get();
    const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return res.status(200).json(eventsList);
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
};

const handlePost = async (req: AuthedRequest, res: NextApiResponse) => {
  try {
    const { title, date, time, location, language } = req.body;
    const newEvent = { title, date, time, location, language };
    
    const docRef = await db.collection('events').add(newEvent);
    return res.status(201).json({ id: docRef.id, ...newEvent });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
};

const handlePut = async (req: AuthedRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ error: 'Event ID is required' });
    }

    const { title, date, time, location, language } = req.body;
    const eventRef = db.collection('events').doc(id as string);

    await eventRef.update({ title, date, time, location, language });

    return res.status(200).json({ message: 'Event updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
};

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}