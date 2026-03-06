import { firestore } from 'firebase-admin';
import { db } from './firebaseAdmin'; // Adjust based on your actual path to firebaseAdmin
import { EventDetails } from '@/types/eventTypes'; // Adjust the path based on your types definition

export const formatEventDate = (date: Date): string => {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getAvailableVenues = async (eventType: string): Promise<string[]> => {
  try {
    const venueRef = db.collection('venues');
    const snapshot = await venueRef.where('eventTypes', 'array-contains', eventType).get();
    const venues: string[] = [];
    
    snapshot.forEach((doc) => {
      venues.push(doc.data().name);
    });

    return venues;
  } catch (err) {
    console.error('Error fetching venues:', err instanceof Error ? err.message : String(err));
    throw new Error('Could not fetch venues');
  }
};

export const saveEventDetails = async (eventDetails: EventDetails): Promise<void> => {
  try {
    await db.collection('events').add(eventDetails);
  } catch (err) {
    console.error('Error saving event details:', err instanceof Error ? err.message : String(err));
    throw new Error('Could not save event details');
  }
};

export const scheduleReminder = (eventDate: Date, contactInfo: string): void => {
  // Logic for scheduling reminders, could be integrated with a service
  console.log(`Reminder set for ${contactInfo} on ${formatEventDate(eventDate)}`);
};