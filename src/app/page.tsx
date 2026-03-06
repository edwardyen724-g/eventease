import React from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

const Page = () => {
  const { user } = useAuth();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Effortless Event Scheduling for Local Planners</h1>
        <p className="mt-4 text-lg text-gray-700">
          Simple booking and scheduling for local event planners and service providers.
        </p>
      </div>

      <div className="mt-10">
        <Image
          src="/images/event-scheduling.png"
          alt="Event Scheduling"
          width={600}
          height={400}
          className="rounded-lg shadow-md"
        />
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800">Features</h2>
        <ul className="mt-4 space-y-2 text-left">
          <li className="flex items-center">
            <span className="mr-2 text-blue-500">✔️</span>
            <span>Customizable event types tailored to specific local needs.</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-blue-500">✔️</span>
            <span>Intuitive calendar interface for easy booking and rescheduling.</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-blue-500">✔️</span>
            <span>Local venue suggestion feature based on event type.</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-blue-500">✔️</span>
            <span>Integration with local payment options to simplify transactions.</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-blue-500">✔️</span>
            <span>Automated email and SMS reminders for upcoming events.</span>
          </li>
        </ul>
      </section>

      <footer className="mt-10 text-gray-600">
        <p>&copy; {new Date().getFullYear()} EventEase. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Page;