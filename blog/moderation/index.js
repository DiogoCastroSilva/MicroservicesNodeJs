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

        try {
            await axios.post(`${process.env.EVENT_BUS_URI}/events`, {
                type: 'CommentModerated',
                data: {
                    ...data,
                    status
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    res.send({});
});


app.listen(port, () => {
    console.log(`Moderation service listening on port: ${port}`);
});