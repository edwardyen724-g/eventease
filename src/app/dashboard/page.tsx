import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  rsvpCount: number;
}

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase.from<Event>('events').select('*');
        if (error) throw error;
        setEvents(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (id: string) => {
    router.push(`/dashboard/event/${id}`);
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events: {error}</div>;

  return (
    <div>
      <h1>Effortlessly Manage Your Cultural Events with Multilingual Booking!</h1>
      <button onClick={() => router.push('/dashboard/create-event')}>Create New Event</button>
      <div>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map(event => (
            <div key={event.id} onClick={() => handleEventClick(event.id)}>
              <h2>{event.title}</h2>
              <p>{event.date} at {event.time}</p>
              <p>Location: {event.location}</p>
              <p>RSVP Count: {event.rsvpCount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;