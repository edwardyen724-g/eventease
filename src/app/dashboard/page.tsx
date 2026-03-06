import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  status: string;
}

const DashboardPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  const fetchEvents = async () => {
    try {
      const { data } = await supabase.from('events').select('*');
      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err instanceof Error ? err.message : String(err));
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    router.push('/dashboard/create-event');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <button 
        onClick={handleCreateEvent} 
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create New Event
      </button>
      <h2 className="mt-6 text-xl">Your Events</h2>
      <ul className="mt-4 space-y-2">
        {events.map(event => (
          <li key={event.id} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Status:</strong> {event.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;