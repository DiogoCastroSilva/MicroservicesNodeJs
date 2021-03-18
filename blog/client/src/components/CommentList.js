import axios from 'axios';
import React, { useEffect, useState } from 'react';


const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

        setComments(res.data);
    };

    const renderComments = comments.map(({ id, content }) => (
        <li key={id}>
            {content}
        </li>
    ));

    return (
        <ul>
            {renderComments}
        </ul>
    );
};

export default CommentList;