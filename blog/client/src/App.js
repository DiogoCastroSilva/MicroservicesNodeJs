import React from 'react';

// Components
import PostCreate from './components/PostCreate';
import PostList from './components/PostList';


const App = () => (
    <div className="container">
        <h1>Create Post</h1>
        <PostCreate />
        <hr />
        <h2>Posts</h2>
        <PostList />
    </div>
);

export default App;