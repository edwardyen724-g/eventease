import { formatISO } from 'date-fns';

export const formatDate = (date: Date): string => {
  return formatISO(date, { representation: 'date' });
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getUniqueItems = <T>(items: T[]): T[] => {
  return Array.from(new Set(items));
};

export const isObjectEmpty = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
};