import React, { useContext } from 'react';
import { UserContext } from '@/pages/_app'; // Adjust the import path if needed

export default function Events() {
  const { user } = useContext(UserContext); // Access user context

  // If there are no active events
  if (!user || user.activeEvents.length === 0) {
    return (
      <div className="p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">No Active Events</h2>
        <p>You currently have no active events.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Your Active Events</h2>
      <ul className="space-y-2">
        {user.activeEvents.map((event) => (
          <li key={event.id} className="border p-3 rounded-md border-blue-200">
            <h3 className="font-semibold text-lg">{event.name}</h3>
            <p className="text-gray-500">Date: {event.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
