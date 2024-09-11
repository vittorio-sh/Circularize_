import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://vittosh:vittosh99@cluster0.2vrai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

export async function DELETE(request) {
    try {
        const { name, email, password } = await request.json();

        await client.connect();
        const db = client.db("vittodb");
        const collection = db.collection("users");

        const result = await collection.deleteOne({ name, email, password });

        return new Response(JSON.stringify({ status: 'User deleted successfully', deletedCount: result.deletedCount }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Failed to delete user:", error.message);

        return new Response(JSON.stringify({ status: 'Failed to delete user', error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } finally {
        await client.close();
    }
}
