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
        <input type="text" name="title" value={eventDetails.title} onChange={handleChange} />
        <button type="submit">Submit</button>
        {loading && <LoadingSpinner />}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default CreateEventPage;