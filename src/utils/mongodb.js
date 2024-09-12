// utils/mongodb.js
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://pass123:pass123@cluster0.2vrai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Your MongoDB URI
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your MongoDB URI to the configuration');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db('vittodb'); // Using your database name
  return { client, db };
}
