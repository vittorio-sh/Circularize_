// pages/api/addUser.js
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/utils/mongodb'; // Use your preferred connectToDatabase function

export async function POST(req) {
  try {
    const { firstName, lastName, email, password } = await req.json();  // Extract user data from request body
    
    if (!firstName || !lastName || !email || !password) {
      return new Response(JSON.stringify({ message: 'All fields are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { db } = await connectToDatabase();  // Reuse existing MongoDB connection
    const collection = db.collection('users');

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      activeEvents: [],
      createdEvents: [],
    };

    // Insert new user into database
    await collection.insertOne(newUser);

    // Return success response with new user data (without password)
    return new Response(JSON.stringify({
      user: { firstName, lastName, email, activeEvents: [], createdEvents: [] },
      message: 'User created successfully',
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Add User API error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
