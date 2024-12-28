require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const dbName = 'formData';
const collectionName = 'submission';
let db;
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
        console.log("Connected");
    })
    .catch(error => console.error(error));
app.post('/submit', (req, res) => {
    const { username, email, gender, dob } = req.body;

    console.log(`Form received`);
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Gender: ${gender}`);
    console.log(`Date of Birth: ${dob}`);

    db.collection(collectionName)
        .insertOne({ username, email, gender, dob })
        .then(result => {
            console.log("saved to MongoDB");
            res.status(200).json({ message: 'Saved successfully' });
        })
        .catch(error => {
            console.error('Error saving data:', error);
            res.status(500).json({ message: 'Error saving data' });
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
