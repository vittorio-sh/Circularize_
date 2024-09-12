import { connectToDatabase } from '@/utils/mongodb';

// Define the POST method as a named export
export async function POST(req) {
  try {
    const { email, updatedUser } = await req.json();  // Parse the incoming JSON data

    if (!email || !updatedUser) {
      return new Response(JSON.stringify({ message: 'Email and updatedUser are required' }), { status: 400 });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('users');

    // Ensure all fields from updatedUser are set, even if they weren't initially provided
    const updatedFields = { ...updatedUser };

    // Update the user in the database by finding via email
    const result = await collection.updateOne(
      { email },              // Find user by email
      { $set: updatedFields }  // Set or update the provided fields
    );

    // Check if a user was actually updated
    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'User updated successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(JSON.stringify({ message: 'Failed to update user', error: error.message }), { status: 500 });
  }
}
