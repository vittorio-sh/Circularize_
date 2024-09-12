// pages/api/updateUser.js
import { connectToDatabase } from '@/utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, updatedUser } = req.body;

    try {
      const { db } = await connectToDatabase();
      const collection = db.collection('users'); // Using your collection 'users'

      await collection.updateOne({ _id: userId }, { $set: updatedUser });

      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
