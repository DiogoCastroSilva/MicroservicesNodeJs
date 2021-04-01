import 'bootstrap/dist/css/bootstrap.css';

// Components
import Header from '../components/header';


const AppComponent = ({ Component, pageProps }) => {
    return (
        <div>
            <Header />
            <Component {...pageProps} />
        </div>
    );
};

export default AppComponent;