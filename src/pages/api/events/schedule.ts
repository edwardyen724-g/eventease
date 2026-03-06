import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../../../lib/dbConnect';
import Event from '../../../models/Event';
import { sendConfirmationEmail } from '../../../lib/emailService';

interface AuthedRequest extends NextApiRequest {
  user?: {
    email: string;
    id: string;
  };
}

const scheduleEvent = async (req: AuthedRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const session = await getSession({ req });
      if (!session || !session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      req.user = { email: session.user.email, id: session.user.id };
      const { title, date, time, duration, attendees } = req.body;

      await dbConnect();

      const newEvent = new Event({
        title,
        date,
        time,
        duration,
        attendees,
        createdBy: req.user.id,
      });

      await newEvent.save();

      await sendConfirmationEmail(req.user.email, newEvent);

      return res.status(201).json({ message: 'Event scheduled successfully', event: newEvent });
    } catch (err) {
      return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
  } else {
    return res.setHeader('Allow', ['POST']).status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default scheduleEvent;