import { ObjectId } from 'mongoose';
import { CalendarEvent } from '../models/Event';

export const formatEventDate = (date: Date): string => {
  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const isValidObjectId = (id: string): boolean => {
  return ObjectId.isValid(id);
};

export const calculateTimeDifference = (start: Date, end: Date): string => {
  const diffInMs = end.getTime() - start.getTime();
  const diffInHours = Math.floor(diffInMs / 3600000);
  const diffInMinutes = Math.floor((diffInMs % 3600000) / 60000);
  return `${diffInHours}h ${diffInMinutes}m`;
};

export const mapEventsForDisplay = (events: CalendarEvent[]): Array<{ id: string; title: string; start: string; end: string }> => {
  return events.map(event => ({
    id: event._id.toString(),
    title: event.title,
    start: formatEventDate(event.startDate),
    end: formatEventDate(event.endDate),
  }));
};