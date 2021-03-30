import axios from "axios";

const LandingPage = ({ currentUser }) => {
    return (
        <h1>Landing Page {currentUser}</h1>
    );
};

LandingPage.getInitialProps = async () => {
    if (typeof window === undefined) {
        // This will be called in the server
        const { data } = await axios.get('http://nginx/api/users/currentuser');
        return data;
    } else {
         // This will be called in the client
         const { data } = await axios.get('/api/users/currentuser');
         return data;
    }
}

export default LandingPage;