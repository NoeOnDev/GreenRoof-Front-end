import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Home.css';
import logo from '../../assets/img/logo.png';
import shape from '../../assets/img/shape.png';
import person from '../../assets/img/person.svg';
import person2 from '../../assets/img/person2.svg';
import person3 from '../../assets/img/person3.svg';
import person4 from '../../assets/img/person4.svg';
const HomeForm = () => {
    const [dark, setDark] = useState(false);
    const [section, setSection] = useState('inicio');

    const toggleAnimation = () => {
        setDark((prevDark) => !prevDark);
        setAnimating(true);
    };

    const handleHamburgerClick = () => {
        const bigWrapper = document.querySelector('.big-wrapper');
        bigWrapper.classList.toggle('active');
    };

    const handleSectionChange = (newSection) => {
        setSection(newSection);
    };

    return (
        <main>
            <div className={`big-wrapper ${dark ? 'dark' : 'light'}`}>
                <img src={shape} alt="" className="shape" />

                <header>
                    <div className="home-container">
                        <div className="logo">
                            <i class="uil uil-pagelines"></i>
                            <h3>GreenRoof</h3>
                        </div>

                        <div className="links">
                            <ul>
                                <li onClick={handleHamburgerClick}>
                                    <button onClick={() => handleSectionChange('inicio')}>
                                        Inicio
                                    </button>
                                </li>
                                <li onClick={handleHamburgerClick}>
                                    <button onClick={() => handleSectionChange('caracteristicas')}>
                                        Características
                                    </button>
                                </li>
                                <li onClick={handleHamburgerClick}>
                                    <button onClick={() => handleSectionChange('ventajas')} >
                                        Ventajas
                                    </button>
                                </li>
                                <li> 
                                    <button><Link to="/auth" className="home-btn">
                                        Iniciar sesión
                                    </Link></button>
                                </li>
                            </ul>
                        </div>

                        <div className="overlay"></div>

                        <div className="hamburger-menu" onClick={handleHamburgerClick}>
                            <div className="bar"></div>
                        </div>
                    </div>
                </header>

                {/* Sección de Inicio */}
                {section === 'inicio' && (
                    <div className="showcase-area">
                        <div className="home-container">
                            <div className="left">
                                <div className="big-title">
                                    <h1 className="titulos-home">Bienvenido a GreenRoof:</h1>
                                    <h1 className="titulos-home">casas inteligentes para tu mejor amigo</h1>
                                </div>
                                <p className="text">
                                    En GreenRoof reinventamos las casas para perros. Nuestras casas tienen techo verde con sistema de monitoreo integrado para garantizar el bienestar de tu mascota.
                                </p>
                                <p className="text">
                                    Con nuestra aplicación web, podrás verificar en tiempo real la temperatura, humedad y más desde tu computadora o teléfono. El riego automático se encarga de mantener el pasto fresco. Duerme tranquilo sabiendo que tu perro está cómodo en su hogar inteligente.
                                </p>
                            </div>

                            <div className="right">
                                <img src={person} alt="Person Image" className="person" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Sección de Características */}
                {section === 'caracteristicas' && (
                    <div className="showcase-area">
                        <div className="home-container">
                            <div className="left">
                                <div className="big-title2">
                                    <h1 className="titulos-home">Caracteristicas</h1>
                                </div>
                            </div>
                            <div className="right">
                                <img src={person2} alt="Person Image" className="person" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Sección de Beneficios (Aún por agregar) */}
                {section === 'ventajas' && (
                    <div className="showcase-area">
                        <div className="home-container">
                            <div className="left">
                                <div className="big-title2">
                                    <h1 className="titulos-home">Ventajas</h1>
                                </div>
                            </div>
                            <div className="right">
                                <img src={person4} alt="Person Image" className="person" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="bottom-area">
                    <div className="home-container">
                        <button className="toggle-btn" onClick={toggleAnimation}>
                            <i className="far fa-moon"></i>
                            <i className="far fa-sun"></i>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HomeForm;
