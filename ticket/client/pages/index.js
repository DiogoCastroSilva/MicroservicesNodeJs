import axios from "axios";
import { useContext } from "react";

import { CurrentUserContext } from "../provider/current-user-provider";

const LandingPage = ({ currentUser }) => {
    const { onSetCurrentuser } = useContext(CurrentUserContext);

    onSetCurrentuser(currentUser);

    const text = currentUser ? 'You are signed in' : 'You are not signed in';

    return (
        <h1>{text}</h1>
    );
};

// This gets called on every request
export async function getServerSideProps({ req }) {
    let props;

    try {
        // Fetch data from external API
        const res = await axios(`http://nginx:80/api/users/currentuser`, {
            headers: req.headers
        });
console.log(res.data);
        props = { ...res.data }
    } catch (e) {
        props = {
            currentUser: null
        };
    }

    // Pass data to the page via props
    return { props: props };
}

export default LandingPage;