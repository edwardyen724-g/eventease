import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Event } from '@/models/Event';
import { AuthenticatedRequest } from '@/types';
import { getSession } from 'next-auth/react';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const eventId = params.id;

  try {
    const session = await getSession({ req });
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const { newDateTime } = await req.json();

    await connectToDatabase();

    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    event.dateTime = newDateTime;
    await event.save();

    return NextResponse.json({ message: 'Event rescheduled successfully', event }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}