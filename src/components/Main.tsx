import React from 'react';
import Features from './Features';

const Main = () => {
    return (
        <main className='main'>
            <section className='hero'>
                <h1> NetBots </h1>
                <p> Multiplayer robot programming game </p>
                <p> Lorem ipsum... </p>
                <div>
                    <button> Get started </button>
                    <button> Learn more </button>
                </div>
            </section>
            <Features />
        </main>
    )
};

export { Main };
export default Main;
