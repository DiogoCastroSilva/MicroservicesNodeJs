// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');


// Constants
const port = 4001;
const commentsByPostId = {};

const app = express();

// Config
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/posts/:id/comments', (req, res) => {
    const { postId } = req.params.id;

    res.send(commentsByPostId[postId] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const { content } = req.body;
    const postId = req.params.id;

    const commentId = randomBytes(4).toString('hex');

    const newComment = {
        id: commentId,
        content,
        status: 'pending'
    };

    const comments = commentsByPostId[postId] || [];

    comments.push({...newComment});

    commentsByPostId[postId] = comments;

    try {
        await axios.post(`${process.env.EVENT_BUS_URI}/events`, {
            type: 'CommentCreated',
            data: {
               postId,
               ...newComment,
            }
        });
    } catch (err) {
        console.error(err);
    }


    res.status(201).send(comments);
});

// Endpoint for the message bus
app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { postId, id, status } = data;

        const comments = commentsByPostId[postId];

        const comment = comments.find(c => c.id === id);
        comment.status = status;

        try {
            await axios.post(`${process.env.EVENT_BUS_URI}/events`, {
                type: 'CommentUpdated',
                data: {
                    ...comment,
                    postId
                }
            });
        } catch (err) {
            console.error(err);
        }

    }

    res.send({});
});


app.listen(port, () => {
    console.log(`Comments service listening in port: ${port}`);
});