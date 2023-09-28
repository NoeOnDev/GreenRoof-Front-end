import Button from "../atoms/Button.jsx";
import '../../assets/styles/Header.css';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header>
            <h1>GreenRoof</h1>

            <nav className={`menu ${showMenu ? 'show-menu' : ''}`}>
                <Button text="Inicio" />
                <Button text="Registrarse" />
                <Button text="Iniciar sesión" />
            </nav>

            <button
                className={`open-menu ${showMenu ? 'close-menu' : ''}`}
                onClick={() => setShowMenu(!showMenu)}
            >
                {showMenu ? <FaTimes /> : <FaBars />}
            </button>
        </header>
    );
}

export default Header;
