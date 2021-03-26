import { useState } from 'react';
import axios from 'axios';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/users/signup', {
                email,
                password
            });

            console.log(response);
        } catch (e) {
            console.log(e);
        }

    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input
                    className="form-input"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    className="form-input"
                    type="password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
            </div>
            <button className="btn btn-primary">
                Sign Up
            </button>
        </form>
    );
};