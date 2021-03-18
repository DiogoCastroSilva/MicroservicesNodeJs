// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');



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

app.post('/posts/:id/comments', (req, res) => {
    const { content } = req.body;
    const { postId } = req.params.id;

    const commentId = randomBytes(4).toString('hex');

    const comments = commentsByPostId[postId] || [];

    comments.push({
        id: commentId,
        content
    });

    commentsByPostId[postId] = comments;

    res.status(201).send(comments);
});


app.listen(port, () => {
    console.log(`Comments service listening in port: ${port}`);
});