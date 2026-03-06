import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebaseAdmin'; // corrected import for Firestore
import LoadingSpinner from '@/components/LoadingSpinner';

const CreateEventPage = () => {
  const router = useRouter();
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEventDetails({
      ...eventDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('User not authenticated');
      }

      await addDoc(collection(db, 'events'), {
        ...eventDetails,
        userId: user.uid,
        createdAt: new Date(),
      });
      router.push('/events');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Create Event</h1>
      <form onSubmit={handleSubmit}>
        {loading ? <LoadingSpinner /> : null}
        {error && <div className="text-red-500">{error}</div>}
        <input type="text" name="title" placeholder="Event Title" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input type="time" name="time" onChange={handleChange} required />
        <input type="text" name="venue" placeholder="Venue" onChange={handleChange} required />
        <select name="type" onChange={handleChange} required>
          <option value="">Select Event Type</option>
          <option value="conference">Conference</option>
          <option value="workshop">Workshop</option>
        </select>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEventPage;