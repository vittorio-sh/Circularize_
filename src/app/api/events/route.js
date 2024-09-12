import { connectToDatabase } from '@/utils/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const eventsCollection = db.collection('events');

    // Fetch all events
    const events = await eventsCollection.find().toArray();

    return new Response(JSON.stringify({ events }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
