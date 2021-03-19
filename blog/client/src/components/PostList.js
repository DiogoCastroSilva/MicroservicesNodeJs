import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';


const PostList = () => {
    const [posts, setPosts] = useState({});

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');

        setPosts(res.data);
    };

    const renderedPosts = Object.values(posts).map(({ id, title, comments }) => (
        <div
            className="card"
            style={{ width: '30%', marginBottom: '20px' }}
            key={id}
        >
            <div className="card-body">
                <h3>{title}</h3>
                <CommentList comments={comments} />
                <CommentCreate postId={id} />
            </div>
        </div>
    ));
    return (
        <div
            className="d-flex flex-row flex-wrap justify-content-between"
        >
            {renderedPosts}
        </div>
    );
};

export default PostList;