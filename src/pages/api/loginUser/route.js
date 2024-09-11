import { MongoClient, ServerApiVersion } from 'mongodb';
// Uncomment the following line to use bcrypt for password hashing
// import bcrypt from 'bcrypt';

const uri = "mongodb+srv://vittosh:vittosh99@cluster0.2vrai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function POST(req) {
  try {
    // Extract the data from the request
    const { email, password } = await req.json();

    // Ensure the email and password are provided
    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Email and password are required." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Connect to the database
    try {
      await client.connect();
    } catch {
      return new Response(JSON.stringify({ message: "Failed to connect to the database." }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const db = client.db('vittodb');
    const collection = db.collection('users');

    // Find the user by email
    let user;
    try {
      user = await collection.findOne({ email });
    } catch {
      return new Response(JSON.stringify({ message: "Error querying the database." }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If user is not found, return an error
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Uncomment this section if you are using hashed passwords
    // const passwordMatch = await bcrypt.compare(password, user.password);

    // Check if the provided password matches the stored password
    if (user.password !== password) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If successful, return the user data or a success message
    return new Response(JSON.stringify({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        likedEvents: user.likedEvents,
        createdEvents: user.createdEvents,
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    try {
      await client.close();
    } catch {
      // Silent fail on close connection
    }
  }
}
