import React, { useContext, useState } from 'react';
import { UserContext } from '@/pages/_app'; 
import Popup from '../components/Popup';

export default function EventCard({ event, onLike, onDislike }) {
  const { user } = useContext(UserContext); 
  const [showPopup, setShowPopup] = useState(false);

  const handleLike = () => {
    if (!user) {
      setShowPopup(true); 
      return;
    }
    onLike(event.id);
  };

  const handleClosePopup = () => {
    setShowPopup(false); 
  };

  return (
    <div className="relative w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col mt-4 mb-4 h-auto shadow-xl">
      {showPopup && (
        <Popup message="Not logged in, can’t like events!" onClose={handleClosePopup} />
      )}

      <div className="flex-shrink-0">
        <img
          src={event.photo}
          alt={event.title}
          className="w-full h-[25vh] md:h-[35vh] lg:h-[40vh] object-cover"
        />
      </div>
      <div className="flex-grow p-4 overflow-auto">
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{event.title}</h3>
        <p className="text-gray-500">{event.date}</p>
        <p className="text-gray-700 mt-2">{event.description}</p>
      </div>

      <div className="px-4 pb-4 flex flex-wrap">
        {event.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-sm mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center p-4">
        <button
          className="flex-1 flex justify-center items-center text-red-400 text-4xl"
          onClick={() => onDislike(event.id)}
        >
          <div className="like">✖</div>
        </button>
        <button
          className="flex-1 flex justify-center items-center text-green-400 text-4xl"
          onClick={handleLike} 
        >
          <div className="like ">❤️</div>
        </button>
      </div>
    </div>
  );
}
