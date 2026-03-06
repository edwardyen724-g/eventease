import React from 'react';
import Image from 'next/image';

const Page: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <section className="w-full max-w-4xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Transform Your Event Bookings with Ease and Style</h1>
        <p className="text-lg mb-6">
          Effortlessly streamline your event bookings with intuitive design.
        </p>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          <Feature
            title="User-friendly Calendar Interface"
            description="Experience drag-and-drop scheduling that simplifies your workflow."
          />
          <Feature
            title="Customizable Themes"
            description="Match the calendar's appearance with your brand identity effortlessly."
          />
          <Feature
            title="One-click Rescheduling"
            description="Easily reschedule events with just a click."
          />
          <Feature
            title="Popular Integrations"
            description="Seamlessly connect with platforms like Eventbrite and Zoom."
          />
          <Feature
            title="Automated Notifications"
            description="Get confirmations and reminders sent straight to your inbox."
          />
        </div>
      </section>
      <Image
        src="/images/event-booking.png"
        alt="Event Ease Booking Interface"
        width={800}
        height={400}
        className="rounded-lg shadow-lg"
      />
      <footer className="mt-10">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Get Started
        </button>
      </footer>
    </main>
  );
};

const Feature: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Page;