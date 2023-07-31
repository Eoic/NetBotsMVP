import React from 'react';
import Link from 'next/link';

const Links = [
    {
        href: '/',
        label: 'Features'
    },
    {
        href: '/',
        label: 'Documentation'
    },
    {
        href: '/',
        label: 'Register'
    },
    {
        href: '/',
        label: 'Login'
    }
];

const Header = () => {
    return (
        <header className='header'>
            <nav className='desktop'>
                <ul>
                    {Links.map(({ href, label }, index) =>
                        (
                            <li key={`${label}-${index}`}>
                                <Link href={href}>{label}</Link>
                            </li>
                        )
                    )}
                </ul>
            </nav>
            <nav className='mobile'>
                <button className='btn tertiary hamburger'>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </header>
    );
};

export { Header };
export default Header;
