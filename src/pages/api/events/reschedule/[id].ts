import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from 'lib/dbConnect';
import Event from 'models/Event'; // Assuming you have an Event model defined
import { rateLimit } from 'lib/rateLimit'; // Assume you have a simple rate limit implementation

interface AuthedRequest extends NextApiRequest {
  user?: {
    email: string;
    name: string;
  };
}

const limiter = new Map();

const handler = async (req: AuthedRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  req.user = { email: session.user.email, name: session.user.name };

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const currentHit = limiter.get(req.ip) || 0;

      if (currentHit >= 5) {
        return res.status(429).json({ message: 'Too many requests' });
      }

      limiter.set(req.ip, currentHit + 1);
      setTimeout(() => limiter.set(req.ip, currentHit), 60000); // reset limit after 1 minute

      await dbConnect();

      const { newDate } = req.body;

      if (!newDate) {
        return res.status(400).json({ message: 'New date is required' });
      }

      const event = await Event.findByIdAndUpdate(id, { date: newDate }, { new: true });
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      return res.status(200).json(event);
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
    }
  } else {
    return res.setHeader('Allow', ['PUT']).status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;