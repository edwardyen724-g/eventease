import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { initializeApp, auth } from 'firebase-admin/app';

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CREDENTIALS || '{}');

if (!admin.apps.length) {
    initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

interface AuthedRequest extends NextApiRequest {
    user?: { uid: string };
}

const rsvpMap = new Map<string, number>();

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { eventId, attendee } = req.body;

    if (!eventId || !attendee) {
        return res.status(400).json({ message: 'Missing eventId or attendee' });
    }

    const rateLimitKey = `${eventId}-${attendee.email}`;
    const currentCount = rsvpMap.get(rateLimitKey) || 0;

    if (currentCount >= 5) {
        return res.status(429).json({ message: 'Too many requests' });
    }

    try {
        const userRecord = await auth().getUser(attendee.uid);

        await admin.firestore().collection('rsvps').add({
            eventId,
            attendee: {
                uid: userRecord.uid,
                email: attendee.email,
                name: attendee.name,
            },
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        rsvpMap.set(rateLimitKey, currentCount + 1);
        setTimeout(() => {
            rsvpMap.delete(rateLimitKey);
        }, 60000); // Reset the count after 1 minute

        return res.status(200).json({ message: 'RSVP successfully recorded' });
    } catch (err) {
        return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
    }
}