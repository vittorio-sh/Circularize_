import React, { useState, useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserContext } from '@/pages/_app'; // Import UserContext to access global state

export default function Create() {
  const { user, setUser } = useContext(UserContext); // Access user data and setUser function from UserContext
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // New state for image URL
  const [tags, setTags] = useState(''); // New state for tags as comma-separated string
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    setLoading(true);
    setError(null);

    try {
      // Convert comma-separated string into an array of tags
      const tagArray = tags.split(',').map(tag => tag.trim());

      const response = await fetch('/api/CreateEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: eventName,
          date: eventDate,
          description,
          imageUrl, // Include the imageUrl in the request body
          tags: tagArray, // Send the tags array
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const data = await response.json();

      // Add the new event to the user's createdEvents array
      const updatedUser = {
        ...user,
        createdEvents: [...user.createdEvents, data.event],
      };

      // Update the user context with the new event
      setUser(updatedUser);

      // Optionally reset form fields after creation
      setEventName('');
      setEventDate('');
      setDescription('');
      setImageUrl('');
      setTags('');
    } catch (error) {
      console.error('Error creating event:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Create Event</h2>
      <form className="space-y-4" onSubmit={handleCreate}>
        {/* Event Name */}
        <div>
          <Label htmlFor="eventName">Event Name</Label>
          <Input
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
            className="mt-1 border-2 border-blue-200 w-full"
          />
        </div>

        {/* Event Date */}
        <div>
          <Label htmlFor="eventDate">Event Date</Label>
          <Input
            id="eventDate"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="mt-1 border-2 border-blue-200 w-full"
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your event"
            className="mt-1 border-2 border-blue-200 w-full"
          />
        </div>

        {/* Image URL */}
        <div>
          <Label htmlFor="imageUrl">Event Image URL</Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL for the event"
            className="mt-1 border-2 border-blue-200 w-full"
          />
        </div>

        {/* Tags */}
        <div>
          <Label htmlFor="tags">Event Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter event tags (e.g., Music, Festival)"
            className="mt-1 border-2 border-blue-200 w-full"
          />
        </div>

        {/* Create Button */}
        <Button
          type="submit" // Submit the form
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Event'}
        </Button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
}
