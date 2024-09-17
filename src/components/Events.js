import React, { useContext } from 'react';
import { UserContext } from '@/pages/_app';

export default function Events() {
  const { user, setUser } = useContext(UserContext);

  const handleRemoveEvent = (eventId) => {
    const updatedActiveEvents = user.activeEvents.filter((event) => event._id !== eventId);
    const updatedUser = { ...user, activeEvents: updatedActiveEvents };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); 
  };

  const handleClearAll = () => {
    const updatedUser = { ...user, activeEvents: [] };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); 
  };

  if (!user || user.activeEvents.length === 0) {
    return (
      <div className="p-4 bg-white shadow-lg rounded-md h-full flex flex-col justify-center items-center max-h-[75vh]">
        <h2 className="text-3xl font-bold mb-4 text-purple-600">No Active Events</h2>
        <p className="text-gray-500">You currently have no active events.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-md flex flex-col h-full max-h-[70vh]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-purple-600">Your Active Events</h2>
        <button
          onClick={handleClearAll}
          className="text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Clear All
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto pr-2">
        <ul className="space-y-3">
          {user.activeEvents.map((event) => (
            <li key={event._id} className="flex justify-between items-center bg-purple-50 p-4 rounded-md shadow hover:shadow-lg transition-shadow duration-200 ease-in-out">
              <div>
                <h3 className="font-semibold text-xl text-purple-800">{event.title}</h3>
                <p className="text-gray-600">Date: {event.date}</p>
              </div>
              <button
                className="text-red-500 hover:text-red-700 text-2xl font-bold transition-transform transform hover:scale-125"
                onClick={() => handleRemoveEvent(event._id)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
