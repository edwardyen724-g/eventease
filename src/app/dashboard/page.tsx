import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { FirebaseConfig } from "../../lib/firebaseConfig";
import DashboardHeader from "../../components/DashboardHeader";
import EventList from "../../components/EventList";
import CreateEventButton from "../../components/CreateEventButton";

const app = initializeApp(FirebaseConfig);
const auth = getAuth(app);

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err instanceof Error ? err.message : String(err));
      }
    };

    if (user) {
      fetchEvents();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to access the dashboard.</div>;
  }

  return (
    <div className="p-4">
      <DashboardHeader user={user} />
      <CreateEventButton />
      <EventList events={events} />
    </div>
  );
};

export default Dashboard;