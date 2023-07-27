import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <header className='header'>
            <nav>
                <ul>
                    <li>
                        <Link href='/'> Features </Link>
                    </li>

                    <li>
                        <Link href='/'> Documentation </Link>
                    </li>

                    <li>
                        <Link href='/'> Register </Link>
                    </li>

                    <li>
                        <Link href='/'> Login </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export { Header };
export default Header;
