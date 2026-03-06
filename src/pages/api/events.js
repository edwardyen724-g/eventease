import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient'; // Ensure you have a supabase client set up
import { Event } from '@/types/Event'; // Define your Event type in types/Event.ts
import { verifyToken } from '@/lib/auth'; // A function to verify Supabase JWT token

interface AuthedRequest extends NextApiRequest {
  user: { id: string; email: string } | null;
}

const events: Record<string, Event[]> = {}; // In-memory storage for event data (simple example)

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const user = await verifyToken(token);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;

    switch (req.method) {
      case 'GET':
        return await getEvents(req, res);
      case 'POST':
        return await createEvent(req, res);
      case 'PUT':
        return await updateEvent(req, res);
      case 'DELETE':
        return await deleteEvent(req, res);
      default:
        return res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']).status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}

async function getEvents(req: AuthedRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', req.user?.id);

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}

async function createEvent(req: AuthedRequest, res: NextApiResponse) {
  try {
    const { title, date, time, location } = req.body;
    const { data, error } = await supabase
      .from('events')
      .insert([{ title, date, time, location, user_id: req.user?.id }]);

    if (error) {
      throw new Error(error.message);
    }

    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}

async function updateEvent(req: AuthedRequest, res: NextApiResponse) {
  try {
    const { id, title, date, time, location } = req.body;
    const { data, error } = await supabase
      .from('events')
      .update({ title, date, time, location })
      .eq('id', id)
      .eq('user_id', req.user?.id);

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}

async function deleteEvent(req: AuthedRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    const { data, error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user?.id);

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}