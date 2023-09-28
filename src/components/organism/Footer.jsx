import React from 'react';
import '../../assets/styles/Footer.css';
import iconFacebook from '../../assets/icons/iconFacebook.svg';
import iconYouTube from '../../assets/icons/iconYouTube.svg';
import iconInstagram from '../../assets/icons/iconInstagram.svg';
import iconTwitter from '../../assets/icons/iconTwitter.svg';
import iconLinkedin from '../../assets/icons/iconLinkedin.svg';
const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="contact-info">
                    <p>&copy; 2023 GreenRoof</p>
                    <p>Correo Electrónico: info@greenroof.com</p>
                    <p>Preguntas o Sugerencias: ¡Contáctenos!</p>
                </div>
                <div className="social-icons">
                    <a href="https://facebook.com/tuempresa" target="_blank" rel="noopener noreferrer">
                        <img src={iconFacebook} alt="Facebook" />
                    </a>

                    <a href="https://twitter.com/tuempresa" target="_blank" rel="noopener noreferrer">
                        <img src={iconTwitter} alt="Twitter" />
                    </a>

                    <a href="https://instagram.com/tuempresa" target="_blank" rel="noopener noreferrer">
                        <img src={iconInstagram} alt="Instagram" />
                    </a>

                    <a href="https://linkedin.com/tuempresa" target="_blank" rel="noopener noreferrer">
                        <img src={iconLinkedin} alt="LinkedIn" />
                    </a>

                    <a href="https://youtube.com/tuempresa" target="_blank" rel="noopener noreferrer">
                        <img src={iconYouTube} alt="YouTube" />
                    </a>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
