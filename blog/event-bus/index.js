// libraries
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

// Constants
const port = 4005;
const events = [];


const app = express();

// Configs
app.use(bodyParser.json());
app.use(cors());


// Routes
app.post('/events', (req, res) => {
    const event = req.body;

    // Add to local database
    events.push(event);

    // Posts service
    axios.post(`${process.env.POSTS_URI}/events`, event).catch((err) => {
        console.log(err.message);
    });
    // Comments service
    axios.post(`${process.env.COMMENTS_URI}/events`, event).catch((err) => {
        console.log(err.message);
    });
    // Query service
    axios.post(`${process.env.QUERY_URI}/events`, event).catch((err) => {
        console.log(err.message);
    });
    // Moderation service
    axios.post(`${process.env.MODERATION_URI}/events`, event).catch((err) => {
        console.log(err.message);
    });

    res.send({ status: 'ok' });
});

app.get('/events', (req, res) => {
    res.send(events);
});


app.listen(port, () => {
    console.log(`Event Bus listening on port: ${port}`);
});
