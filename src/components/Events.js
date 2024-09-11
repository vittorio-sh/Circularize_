import React, { useState } from 'react';

const mockEvents = [
  { id: 1, name: 'Tech Conference', date: '2024-09-12' },
  { id: 2, name: 'Music Festival', date: '2024-10-05' },
  { id: 3, name: 'Art Expo', date: '2024-11-21' },
];

export default function Events() {
  const [events, setEvents] = useState(mockEvents);

  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Upcoming Events</h2>
      <ul className="space-y-2">
        {events.map((event) => (
          <li key={event.id} className="border p-3 rounded-md border-blue-200">
            <h3 className="font-semibold text-lg">{event.name}</h3>
            <p className="text-gray-500">Date: {event.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
