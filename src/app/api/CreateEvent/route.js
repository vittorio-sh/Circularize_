import { connectToDatabase } from '@/utils/mongodb';

export async function POST(req) {
  try {
    const { name, date, description, imageUrl, tags } = await req.json();

    if (!name || !date || !description || !imageUrl || !tags) {
      return new Response(
        JSON.stringify({ message: 'All fields are required' }),
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('events');

    const newEvent = {
      name,
      date,
      description,
      imageUrl,
      tags,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newEvent);

    return new Response(
      JSON.stringify({
        message: 'Event created successfully',
        event: result.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create event:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to create event', error: error.message }),
      { status: 500 }
    );
  }
}
