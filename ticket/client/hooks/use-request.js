import { useState } from 'react';
import axios from 'axios';


export default ({ url, method, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async ({ body }) => {
        setErrors(null);

        try {
            const response = await axios[method](
                url,
                body
            );

            onSuccess(response.data);

            return response.data;
        } catch (err) {
            if (err?.length > 0)
            setErrors(
                <div className="alert alert-danger">
                    <h4>Ooops....</h4>
                    <ul className="my-0">
                        {err.map(error => (
                            <li key={error.message}>
                                {error.message}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    };


    return {
        errors,
        doRequest
    };
};