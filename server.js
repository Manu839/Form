require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 3000;
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
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Gender: ${gender}`);
    console.log(`Date of Birth: ${dob}`);
    res.status(200).send('received');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
