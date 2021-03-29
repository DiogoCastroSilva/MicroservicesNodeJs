import { useState } from 'react';
import axios from 'axios';


export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost/api/users/signup`, {
                email,
                password
            });

        } catch (err) {
            console.log(err.response);
            setErrors(err);
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
            {errors.length > 0 && (
                <div className="alert alert-danger">
                    <h4>Ooops....</h4>
                    <ul className="my-0">
                        {errors.map(error => (
                            <li key={error.message}>
                                {error.message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button className="btn btn-primary">
                Sign Up
            </button>
        </form>
    );
};