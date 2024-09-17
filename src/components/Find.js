import React, { useState, useEffect, useContext } from 'react';
import EventCard from './EventCard';
import { UserContext } from '@/pages/_app'; 

export default function Find() {
  const { user, setUser } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const { events } = await response.json();
        setEvents(events);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleLikeDislike = async (eventId, liked = false) => {
    const event = events[currentEventIndex];
    if (!event) return;

    if (liked) {
      const updatedUser = { 
        ...user, 
        activeEvents: [...user.activeEvents, event] 
      };

      // Update the user context and persist to localStorage
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Send a request to the backend to update the user in the database
      try {
        const response = await fetch('/api/updateUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            updatedUser: { activeEvents: updatedUser.activeEvents }
          }),
        });

        if (!response.ok) throw new Error('Failed to update user in the database');
        console.log('User updated successfully in the database');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }

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
          onLike={() => handleLikeDislike(events[currentEventIndex]._id, true)}
          onDislike={() => handleLikeDislike(events[currentEventIndex]._id)}
        />
      )}
    </div>
  );
}
