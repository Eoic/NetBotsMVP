'use client'

import Link from 'next/link';
import React, { useState } from 'react';

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className={`header ${isMobileMenuOpen && 'overlay'}`}>
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
            <nav className='mobile' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <button className={`btn tertiary hamburger ${isMobileMenuOpen && 'active'}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {isMobileMenuOpen && (<ul>
                    {Links.map(({ href, label }, index) =>
                        (
                            <li key={`${label}-${index}`}>
                                <Link href={href}>{label}</Link>
                            </li>
                        )
                    )}
                </ul>)}
            </nav>
        </header>
    );
};

export { Header };
export default Header;
