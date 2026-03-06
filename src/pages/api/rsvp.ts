import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string }; // Extend as needed
}

const responsesMap = new Map<string, number>();

const rateLimit = (key: string) => {
  const currentTime = Date.now();
  const requests = responsesMap.get(key) || 0;

  if (requests >= 5) {
    throw new Error('Too many requests, please try again later.');
  }

  responsesMap.set(key, requests + 1);

  setTimeout(() => {
    responsesMap.set(key, responsesMap.get(key) as number - 1);
  }, 60000); // 1 minute
};

const handler = async (req: AuthedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed' });
  }

  const userId = req.user?.id; // Assuming user is authenticated
  const { eventId, attendees } = req.body;

  if (!userId || !eventId || !attendees || !Array.isArray(attendees)) {
    return res.status(400).send({ message: 'Invalid request body' });
  }

  try {
    rateLimit(userId);

    const { error } = await supabase
      .from('rsvps')
      .insert([{ event_id: eventId, user_id: userId, attendees }]);

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).send({ message: 'RSVP submitted successfully' });
  } catch (err) {
    return res.status(500).send({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default handler;