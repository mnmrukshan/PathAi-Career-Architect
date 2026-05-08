
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './.env.local' });

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  console.log('URI:', uri);
  if (!uri) {
    console.error('MONGODB_URI is missing');
    return;
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db();
    console.log('Database name:', db.databaseName);
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.close();
  }
}

testConnection();
