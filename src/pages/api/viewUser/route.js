import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://vittosh:vittosh99@cluster0.2vrai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function GET() {
  try {
    await client.connect();
    const db = client.db('vittodb');
    const collection = db.collection('users');

    // Retrieve all users from the collection
    const users = await collection.find({}).toArray();

    // Return the users as JSON
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Failed to retrieve users:", error.message);

    // Return an error response
    return new Response(JSON.stringify({ status: 'Failed to retrieve users', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    // Close the client connection
    await client.close();
  }
}
