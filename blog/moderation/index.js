// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// Constants
const port = 4003;

const app = express();

// Config
app.use(bodyParser.json());

// Routes
app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                ...data,
                status
            }
        });
    }

    res.send({});
});


app.listen(port, () => {
    console.log(`Moderation service listening on port: ${port}`);
});