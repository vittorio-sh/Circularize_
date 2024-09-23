import React from 'react';

export default function Popup({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <div className="text-lg font-semibold mb-4">{message}</div>
        <button
          onClick={onClose}
          className="bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
