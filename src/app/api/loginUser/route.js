// pages/api/loginUser.js
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/utils/mongodb'; // Use your preferred connectToDatabase function

export async function POST(req) {
  try {
    const { email, password } = await req.json();  // Extract email and password from request body

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email and password are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { db } = await connectToDatabase();  // Reuse existing MongoDB connection
    const collection = db.collection('users');

    // Find user by email
    const user = await collection.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Compare entered password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If successful, return user data (without password)
    const { firstName, lastName, phoneNumber, city, zipCode, birthday, country, activeEvents, createdEvents } = user;
    return new Response(JSON.stringify({
      message: 'Login successful',
      user: { firstName, lastName, email, phoneNumber, city, zipCode, birthday, country, activeEvents, createdEvents },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Login API error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
