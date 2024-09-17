import React, { useState, useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserContext } from '@/pages/_app'; 

export default function Create() {
  const { user, setUser } = useContext(UserContext); 
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError(null);

    try {
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
          imageUrl, 
          tags: tagArray, 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const data = await response.json();

      const updatedUser = {
        ...user,
        createdEvents: [...user.createdEvents, data.event],
      };

      setUser(updatedUser);

      // reset form fields after 
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
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Create Event</h2>
      <form className="space-y-4" onSubmit={handleCreate}>
        <div>
          <Label htmlFor="eventName">Event Name</Label>
          <Input
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
            className="mt-1 border-2 border-purple-200 w-full"
            required
          />
        </div>
        <div>
          <Label htmlFor="eventDate">Event Date</Label>
          <Input
            id="eventDate"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="mt-1 border-2 border-purple-200 w-full"
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your event"
            className="mt-1 border-2 border-purple-200 w-full"
            required
          />
        </div>
        <div>
          <Label htmlFor="imageUrl">Event Image URL</Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL for the event"
            className="mt-1 border-2 border-purple-200 w-full"
              required
          />
        </div>
        <div>
          <Label htmlFor="tags">Event Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter event tags (e.g., Music, Festival)"
            className="mt-1 border-2 border-purple-200 w-full"
            required
          />
        </div>
        <Button
          type="submit" 
          className="w-full bg-purple-500 text-white hover:bg-purple-600"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Event'}
        </Button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
}
