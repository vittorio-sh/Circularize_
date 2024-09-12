import { connectToDatabase } from '@/utils/mongodb'; // Assuming you have a MongoDB connection utility

export async function POST(req) {
  try {
    // Parse the request body (ensure req.body works with Next.js)
    const { name, date, description, imageUrl, tags } = await req.json();

    // Validate the required fields
    if (!name || !date || !description || !imageUrl || !tags) {
      return new Response(
        JSON.stringify({ message: 'All fields are required' }),
        { status: 400 }
      );
    }

    // Connect to the database
    const { db } = await connectToDatabase();
    const collection = db.collection('events');

    // Create the new event object, including tags
    const newEvent = {
      name,
      date,
      description,
      imageUrl, // Store the image URL
      tags,     // Store the tags array
      createdAt: new Date(),
    };

    // Insert the new event into the database
    const result = await collection.insertOne(newEvent);

    // Return the created event
    return new Response(
      JSON.stringify({
        message: 'Event created successfully',
        event: result.insertedId, // Use result.insertedId for newer MongoDB versions
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

export const config = {
  api: {
    bodyParser: true, // Ensure body parsing is enabled
  },
};

