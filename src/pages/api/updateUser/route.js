import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://vittosh:vittosh99@cluster0.2vrai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const { email, name, likedEvents, createdEvents } = await req.json(); // Get the body data

    await client.connect();
    const db = client.db('vittodb');
    const collection = db.collection('users');

    const result = await collection.updateOne(
      { email }, // Find by email
      {
        $set: {
          name,
          likedEvents,
          createdEvents
        }
      },
      { upsert: true } // Insert if no matching document is found
    );

    return new Response(JSON.stringify({ message: 'User updated successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(JSON.stringify({ error: 'Failed to update user' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } finally {
    await client.close();
  }
}
