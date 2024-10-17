// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const username = 'sajidgsheet7';
const password = 'S@jid123'; // Your password
const uri = `mongodb+srv://${username}:${encodeURIComponent(password)}@cluster0.nm6l7.mongodb.net/your_database_name?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Define a Record model
const recordSchema = new mongoose.Schema({
    name: String,
    mobile: String
});
const Record = mongoose.model('Record', recordSchema);

// Routes
app.get('/records', async (req, res) => {
    const records = await Record.find();
    res.json(records);
});

app.post('/add', async (req, res) => {
    const { name, mobile } = req.body;
    const newRecord = new Record({ name, mobile });
    await newRecord.save();
    res.json(newRecord);
});

app.post('/update', async (req, res) => {
    const { name, mobile } = req.body;
    const updatedRecord = await Record.findOneAndUpdate({ name }, { mobile }, { new: true });
    res.json(updatedRecord);
});

app.post('/delete', async (req, res) => {
    const { name } = req.body;
    await Record.deleteOne({ name });
    res.json({ message: `Record deleted for ${name}` });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
