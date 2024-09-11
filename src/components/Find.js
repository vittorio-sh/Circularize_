import React, { useState, useEffect } from 'react';
import EventCard from './EventCard'; // Replace with your actual EventCard component

export default function Find() {
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Mock fetching events from the database
  useEffect(() => {
    const fetchEvents = async () => {
      // Replace this with your actual API/database call
      const fetchedEvents = [
        {
          id: 1,
          photo: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG11c2ljJTIwZmVzdGl2YWx8ZW58MHx8fHwxNjE3MzY1MjI4&ixlib=rb-1.2.1&q=80&w=1080',
          title: 'Music Festival',
          date: '2024-09-12',
          description: 'A fun music festival with various artists performing live.',
          tags: ['Music', 'Festival', 'Live'],
        },
        {
          id: 2,
          photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fHRlY2glMjBjb25mZXJlbmNlfGVufDB8fHx8MTYxNzM2NTIyOQ&ixlib=rb-1.2.1&q=80&w=1080',
          title: 'Tech Conference',
          date: '2024-10-05',
          description: 'An informative tech conference with industry leaders.',
          tags: ['Tech', 'Conference', 'Innovation'],
        },
        // Add more events here
      ];
      setEvents(fetchedEvents);
    };

    fetchEvents();
  }, []);

  const handleLike = (eventId) => {
    // Handle liking the event
    console.log(`Liked event with ID: ${eventId}`);
    // Move to the next event
    setCurrentEventIndex((prevIndex) => prevIndex + 1);
  };

  const handleDislike = (eventId) => {
    // Handle disliking the event
    console.log(`Disliked event with ID: ${eventId}`);
    // Move to the next event
    setCurrentEventIndex((prevIndex) => prevIndex + 1);
  };

  if (currentEventIndex >= events.length) {
    return <div>No more events!</div>;
  }

  return (
    <div className="flex justify-center items-center h-full">
      {events.length > 0 && (
        <EventCard
          event={events[currentEventIndex]}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      )}
    </div>
  );
}
