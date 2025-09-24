// server.js
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017"; 
const client = new MongoClient(url);

// Database name
const dbName = "bloodDonation";

async function main() {
    try {
        // Connect the client
        await client.connect();
        console.log("✅ Connected successfully to MongoDB");

        const db = client.db(dbName);
        const collection = db.collection("donors");

        // Example: Insert a document
        const result = await collection.insertOne({ name: "Abin", age: 22 });
        console.log("Inserted:", result.insertedId);

        // Example: Find documents
        const users = await collection.find().toArray();
        console.log("Users:", users);

    } catch (err) {
        console.error("❌ Connection error:", err);
    } finally {
        await client.close();
    }
}

main();
