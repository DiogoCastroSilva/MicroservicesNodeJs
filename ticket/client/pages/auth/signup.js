import { useState } from 'react';
import { useRouter } from 'next/router';

// Hooks
import useRequest from '../../hooks/use-request';


export default () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: 'http://localhost/api/users/signup',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => router.push('/')
    });

    const onSubmit = (e) => {
        e.preventDefault();

        doRequest();
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
            {errors}
            <button className="btn btn-primary">
                Sign Up
            </button>
        </form>
    );
};