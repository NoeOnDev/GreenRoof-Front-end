import React from 'react';
import Header from "../components/organism/Header.jsx";
import Footer from "../components/organism/Footer.jsx";

const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;