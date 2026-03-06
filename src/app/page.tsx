import React from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);

const Page: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-blue-600">
        Effortlessly Manage Your Cultural Events with Multilingual Booking!
      </h1>
      <p className="mt-4 text-lg text-center">
        Streamlined booking management tools tailored for cultural and community events.
      </p>
      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">MVP Features</h2>
        <ul className="list-disc list-inside">
          <li>Simple event creation workflow with customizable date, time, and location fields.</li>
          <li>Multilingual booking interface to cater to diverse event attendees.</li>
          <li>Event rescheduling functionality with notifications for changed dates/times.</li>
          <li>Basic attendance tracking with RSVP functionality.</li>
          <li>User-friendly dashboard for managing events, attendees, and bookings.</li>
        </ul>
      </div>
      <div className="mt-10">
        <button
          className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => {
            // Code to navigate to the event creation page or sign in
          }}
        >
          Get Started
        </button>
      </div>
    </main>
  );
};

export default Page;