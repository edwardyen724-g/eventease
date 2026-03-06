import React from 'react';
import Link from 'next/link';

const Page: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Effortlessly Manage Your Cultural Events with Multilingual Booking!</h1>
        <p className="mt-4 text-lg">Streamlined booking management tools tailored for cultural and community events.</p>
      </header>
      
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Features</h2>
        <ul className="list-disc list-inside mt-4">
          <li>Simple event creation workflow with customizable date, time, and location fields.</li>
          <li>Multilingual booking interface to cater to diverse event attendees.</li>
          <li>Event rescheduling functionality with notifications for changed dates/times.</li>
          <li>Basic attendance tracking with RSVP functionality.</li>
          <li>User-friendly dashboard for managing events, attendees, and bookings.</li>
        </ul>
      </section>

      <footer className="mt-8 text-center">
        <Link href="/signup" className="inline-block bg-blue-500 text-white py-2 px-4 rounded">
          Get Started
        </Link>
      </footer>
    </div>
  );
};

export default Page;