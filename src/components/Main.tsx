import React from 'react';
import Features from './Features';
import CanvasBackground from './CanvasBackground';

const Main = () => {
    return (
        <main className='main'>
            <section className='hero'>
                <h1 className='title'> NetBots </h1>
                <p className='subtitle'> Multiplayer robot programming game </p>
                <p className='description'> Show off your coding skills in our multiplayer robot programming game. Command robots using code scripts or an user-friendly graphical editor to engage in real-time or asynchronous multiplayer matches. With configurable game rules and diverse maps, you will compete against other players in an exhilarating showdown of algorithmic design, strategic thinking and programming skills. </p>
                <div className='actions'>
                    <button className='btn tertiary'> Get started </button>
                    <button className='btn secondary'> Learn more </button>
                </div>
            </section>
            <Features />
            <CanvasBackground />
        </main>
    )
};

export { Main };
export default Main;
