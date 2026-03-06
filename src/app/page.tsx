import React from 'react';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Transform Your Event Bookings with Ease and Style</h1>
      <p className="text-lg text-center mb-8">
        Effortlessly streamline your event bookings with intuitive design.
      </p>
      <div className="flex flex-col items-center space-y-4">
        <Link href="/get-started" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Get Started
        </Link>
        <Link href="/features" className="text-blue-600 underline">
          Explore Our Features
        </Link>
      </div>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc list-inside">
          <li>User-friendly calendar interface with drag-and-drop scheduling</li>
          <li>Customizable themes to match your brand identity</li>
          <li>Simple rescheduling functionality with one click</li>
          <li>Integration with popular event management platforms like Eventbrite and Zoom</li>
          <li>Automated email notifications for confirmations and reminders</li>
        </ul>
      </section>
    </main>
  );
};

export default LandingPage;