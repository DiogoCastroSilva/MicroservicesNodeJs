const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// Constants
const port = 4002
const posts = {};


const app = express();

// Config
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = {
            id,
            title,
            comments: []
        };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId } = data;

        const post = posts[postId];
        post.comments.push({
            id,
            content
        });
    }

    res.send({});
});


app.listen(port, () => {
    console.log(`Query service listening at port: ${port}`);
});