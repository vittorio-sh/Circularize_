import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function Create() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    // Logic to handle creating an event
    console.log({ eventName, eventDate, description });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Create Event</h2>
      <form className="space-y-4">
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

        {/* Create Button */}
        <Button
          onClick={handleCreate}
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Create Event
        </Button>
      </form>
    </div>
  );
}
