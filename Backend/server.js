const bodyParser = require('body-parser');
const express = require('express');
const { MongoClient } = require('mongodb');
const cors=require('cors')
require('dotenv').config();

const url = process.env.MONGO_URL || 'mongodb://localhost:27017'; // Use the environment variable
const client = new MongoClient(url);
const port = 3000;


// Database Name
const dbName = 'passOp';
const app = express();
app.use(cors())
app.use(bodyParser.json());

client.connect().then(() => {
    console.log('Connected successfully to server');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.get('/', async function (req, res) {
    try {
        const db = client.db(dbName);
        const collection = db.collection('Password');
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/', async function (req, res) {
    try {
        const password = req.body;
        const db = client.db(dbName);
        const collection = db.collection('Password'); // Insert into 'documents' collection
        await collection.insertOne(password);
        res.send({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to insert document' });
    }
});

app.delete('/', async function (req, res) {
    try {
        const password = req.body;
        const db = client.db(dbName);
        const collection = db.collection('Password'); // Insert into 'documents' collection
        await collection.deleteOne(password);
        res.send({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to insert document' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
