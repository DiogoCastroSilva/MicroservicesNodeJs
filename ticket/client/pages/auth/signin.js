import { useRouter } from 'next/router';

// Hooks
import useRequest from '../../hooks/use-request';

// Components
import AuthForm from '../../components/auth-form';



export default () => {
    const router = useRouter();

    const { doRequest, errors } = useRequest({
        url: 'http://localhost/api/users/signin',
        method: 'post',
        onSuccess: () => router.push('/')
    });

    const onSubmit = async (body) => {
        await doRequest(body);
    };

    return (
        <AuthForm
            formName='Sign In'
            onFormSubmit={onSubmit}
            errors={errors}
        />
    );
};