import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

interface EventDetails {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setEventDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!eventDetails) return <p>No event found.</p>;

  return (
    <div>
      <h1>{eventDetails.title}</h1>
      <p>{eventDetails.description}</p>
      <p>
        Date: {new Date(eventDetails.date).toLocaleDateString()} at {eventDetails.time}
      </p>
      <p>Location: {eventDetails.location}</p>
      {/* Add other event functionalities like RSVP, reschedule, etc. */}
    </div>
  );
}