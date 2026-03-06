import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';
import Event from '@/lib/models/Event'; // Assuming you have a model in lib/models/Event.ts

interface AuthedRequest extends NextApiRequest {
  user?: {
    email: string;
  };
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI as string);
};

const scheduleEvent = async (req: AuthedRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (!session || !session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    const { title, date, time, location } = req.body;
    const newEvent = new Event({
      title,
      date,
      time,
      location,
      userEmail: session.user.email,
    });

    await newEvent.save();
    return res.status(201).json({ message: 'Event scheduled successfully', event: newEvent });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export async function GET(req: AuthedRequest, res: NextApiResponse) {
  return res.status(200).json({ message: 'GET method is not allowed for this endpoint' });
}

export async function POST(req: AuthedRequest, res: NextApiResponse) {
  return scheduleEvent(req, res);
}