// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

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

app.post('/posts', (req, res) => {
    const { title } = req.body;

    const id = randomBytes(4).toString('hex');

    posts[id] = {
        id,
        title
    };

    res.status(201).send(posts[id]);
});


app.listen(port, () => {
    console.log(`Post service listening in port: ${port}`);
});