// /src/app/api/testConnection/route.js

import { MongoClient, ServerApiVersion } from 'mongodb';

export async function GET() {
  const uri = "mongodb+srv://vittosh:vittosh99@cluster0.2vrai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    await client.db("vittoAccountDB").command({ ping: 1 });  // Pinging the specific database
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    return new Response(JSON.stringify({ status: 'Connected successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error("Connection failed:", err.message);
    return new Response(JSON.stringify({ status: 'Failed to connect', error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await client.close();
  }
}
