const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.khtuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let dbConnection;

async function connectMongoDB() {
    if (dbConnection) return dbConnection;
    try {
        await client.connect();
        console.log("Connected to MongoDB via db.js");
        dbConnection = client.db('crowdfunding');
        return dbConnection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

function getDb() {
    if (!dbConnection) {
        throw new Error("Must connect to db first");
    }
    return dbConnection;
}

module.exports = { connectMongoDB, getDb };
