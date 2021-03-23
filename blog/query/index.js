// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


// Constants
const port = 4002
const posts = {};


const app = express();

// Config
app.use(bodyParser.json());
app.use(cors());


// Helper functions
const handleEvent = ({ type, data }) => {
    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = {
            id,
            title,
            comments: []
        };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];

        post.comments.push({
            id,
            content,
            status
        });
    }

    if (type === 'CommentUpdated') {
        const { postId, id, status, content } = data;

        const post = posts[postId];
        const comment = post.comments.find(c => c.id === id);

        comment.status = status;
        comment.content = content;
    }
};

// Routes
app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    handleEvent(req.body);

    res.send({});
});


app.listen(port, async () => {
    console.log(`Query service listening on port: ${port}`);

    try {
        const res = await axios.get(`${process.env.EVENT_BUS_URI}/events`);

        for (let event of res.data) {
            console.log('Processing event', event.type);

            handleEvent(event);
        }
    } catch (err) {
        console.error(err);
    }


});