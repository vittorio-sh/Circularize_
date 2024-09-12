// lib/api.js

// API call to update user data
export async function updateUserInDb(updatedUser) {
    const res = await fetch('/api/updateUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });
  
    if (!res.ok) {
      throw new Error('Failed to update user');
    }
  }
  
  // API call to create a new event
  export async function createEventInDb(eventData) {
    const res = await fetch('/api/createEvent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
  
    if (!res.ok) {
      throw new Error('Failed to create event');
    }
  
    const data = await res.json();
    return data.newEvent; // Return the newly created event data
  }
  