import '../styles/main.scss';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'NetBots',
    description: 'Multiplayer robot programming game',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className={'landing'}>
                {children}
            </body>
        </html>
    )
};

export default RootLayout;
