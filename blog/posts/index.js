// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');


// Constants
const port = 4000;

const posts = {};


const app = express();

// Configs
app.use(bodyParser.json());
app.use(cors());


// Routes
app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const { title } = req.body;

    const id = randomBytes(4).toString('hex');

    posts[id] = {
        id,
        title
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    });

    res.status(201).send(posts[id]);
});

// Endpoint for the message bus
app.post('/events', (req, res) => {
    console.log('Received event', req.body.type);

    res.send({});
});

app.listen(port, () => {
    console.log(`Post service listening in port: ${port}`);
});