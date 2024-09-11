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

// Named export for the POST method
export async function POST(req, res) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    await client.connect();
    const db = client.db('vittodb');
    const collection = db.collection('users');

    // Hash the password before storing it (uncomment if bcrypt is installed)
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name: `${firstName} ${lastName}`, // Combine first and last name
      email: email,
      // Use hashed password in a real application
      password: password, // Replace with `hashedPassword` if using bcrypt
      createdAt: new Date(),
      likedEvents: [],
      createdEvents: []
    };

    // Insert the new user into the collection
    const result = await collection.insertOne(newUser);

    // Return a success response with name, email, and password (for demo only, not recommended to return password)
    return new Response(JSON.stringify({
      status: 'User added successfully',
      userId: result.insertedId,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      likedEvents: newUser.likedEvents // In production, never return the password in a response
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Failed to insert user:", error.message);

    // Return an error response
    return new Response(JSON.stringify({ status: 'Failed to insert user', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await client.close();
  }
}
