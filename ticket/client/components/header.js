import Link from 'next/link';
import { useContext } from 'react';

// Context
import { CurrentUserContext } from '../provider/current-user-provider';


const Header = () => {
    const { curentuser } = useContext(CurrentUserContext);

    const links = (!curentuser ? [
        { label: 'Sign Up', href: '/auth/signup' },
        { label: 'Sign In', href: '/auth/signin' }
    ] : [
        { label: 'Sign Out', href: '/auth/signout' }
    ]).map(({ label, href }) => (
        <li key={href} className="nav-item">
            <Link href={href}>
                <a className="nav-link">
                    {label}
                </a>
            </Link>
        </li>
    ));

    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brand">
                    GitTix
                </a>
            </Link>
            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">
                    {links}
                </ul>
            </div>
        </nav>
    );
};

export default Header;