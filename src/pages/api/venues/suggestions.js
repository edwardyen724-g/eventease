import { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, cert } from "firebase-admin/app";
import { RateLimiterMemory } from "rate-limiter-flexible";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');

const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(app);

interface AuthedRequest extends NextApiRequest {
  user?: {
    uid: string;
  };
}

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 1, // 5 requests per second
});

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await rateLimiter.consume(req.headers['origin'] || 'global');

    const { eventType } = req.body;

    if (!eventType) {
      return res.status(400).json({ message: "Event type is required." });
    }

    const venuesSnapshot = await db.collection("venues").where("eventTypes", "array-contains", eventType).get();

    const venues = venuesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(venues);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}