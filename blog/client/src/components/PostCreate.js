import React, { useState } from 'react';

// Libraries
import axios from 'axios';


const PostCreate = () => {
    const [title, setTitle] = useState('');

    const setTitleHandler = (e) => {
        const { value } = e.currentTarget;

        setTitle(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:4000/posts', {
            title
        });

        setTitle('');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className="form-control"
                        onChange={setTitleHandler}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default PostCreate;