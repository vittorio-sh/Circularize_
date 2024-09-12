// pages/api/createEvent.js
import { connectToDatabase } from '@/utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { eventName, eventDate, description } = req.body;

    try {
      const { db } = await connectToDatabase();
      const collection = db.collection('events'); // Assuming you're storing events in an 'events' collection

      const newEvent = {
        name: eventName,
        date: eventDate,
        description,
        createdAt: new Date(),
      };

      const result = await collection.insertOne(newEvent);

      res.status(201).json({ newEvent: result.ops[0] });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create event', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
