// libraries
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// Constants
const port = 4005;


const app = express();

// Configs
app.use(bodyParser.json());


// Routes
app.post('/events', (req, res) => {
    const event = req.body;

    // Posts service
    axios.post('http://localhost:4000/events', event);
    // Comments service
    axios.post('http://localhost:4001/events', event);
    // Query service
    axios.post('http://localhost:4002/events', event);
    // Moderation service
    axios.post('http://localhost:4003/events', event);

    res.send({ status: 'ok' });
});


app.listen(port, () => {
    console.log(`Event Bus listening on port: ${port}`);
});
