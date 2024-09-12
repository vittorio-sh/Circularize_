import React from 'react';

export default function EventCard({ event, handleLike, handleDislike }) {
  return (
    <div className="relative w-full max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col mt-4 mb-4 h-auto">
      {/* Event Photo */}
      <div className="flex-shrink-0">
        <img
          src={event.photo}
          alt={event.title}
          className="w-full h-[25vh] md:h-[35vh] lg:h-[40vh] object-cover"
        />
      </div>

      {/* Event Details */}
      <div className="flex-grow p-4 overflow-auto">
        <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-500">{event.date}</p>
        <p className="text-gray-700 mt-2">{event.description}</p>
      </div>

      {/* Tags */}
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

      {/* Like and Dislike Buttons */}
      <div className="flex justify-between items-center p-4">
        {/* Dislike Button */}
        <button
          className="flex-1 flex justify-center items-center text-red-500 text-4xl"
          onClick={() => handleDislike(event.id)}
        >
          <div className="like">✖</div>
        </button>

        {/* Like Button */}
        <button
          className="flex-1 flex justify-center items-center text-green-500 text-4xl"
          onClick={() => handleLike(event.id)}
        >
          <div className="like">❤️</div>
        </button>
      </div>
    </div>
  );
}
