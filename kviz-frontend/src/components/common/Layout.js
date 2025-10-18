import React from 'react';
import HeaderTwo from './header/HeaderTwo';
import FooterTwo from './footer/FooterTwo';

const Layout = ( { children } ) => {
    return (
        <>
            <main className="main-wrapper">
                <HeaderTwo/>
                { children }
                <FooterTwo />
            </main>
        </>
    )
}
export default Layout;