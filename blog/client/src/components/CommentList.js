import React from 'react';


const CommentList = ({ comments }) => {
    const renderComments = comments.map(({ id, content, status }) => {
        let contentStatus;

        switch(status) {
            case 'approved':
                contentStatus = content;
                break;
            case 'pending':
                contentStatus = 'This comment is awaiting moderation';
                break;
            case 'rejected':
                contentStatus = 'This comment has been rejected';
                break;
        };

        return  (
            <li key={id}>
                {contentStatus}
            </li>
        );
    });

    return (
        <ul>
            {renderComments}
        </ul>
    );
};

export default CommentList;