import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../lib/firebase'; // Adjust the path as necessary
import { Venue } from '../../types'; // Assuming Venue interface is defined in types

const VenueSuggestionsPage: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, 'venues'));
        const venueList: Venue[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Venue));
        setVenues(venueList);
      } catch (err) {
        console.error('Error fetching venues:', err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (loading) {
    return <div>Loading venues...</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Venue Suggestions</h1>
      <ul>
        {venues.length === 0 ? (
          <li>No venues available at the moment.</li>
        ) : (
          venues.map(venue => (
            <li key={venue.id} className="mb-4 border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{venue.name}</h2>
              <p>{venue.description}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default VenueSuggestionsPage;