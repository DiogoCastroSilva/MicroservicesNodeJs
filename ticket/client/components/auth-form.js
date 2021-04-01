import { useState } from 'react';


const AuthForm = ({
    formName,
    errors,
    onFormSubmit
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        onFormSubmit({ email, password });
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>{formName}</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input
                    className="form-control"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    className="form-control"
                    type="password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
            </div>
            {errors}
            <button className="btn btn-primary">
                {formName}
            </button>
        </form>
    );
};

export default AuthForm;