
import React from 'react';
import MainLayout from "../templates/MainLayout.jsx";
import Feature from "../components/molecules/Feature.jsx";
import '../assets/styles/Home.css';
import icon1 from '../assets/icons/icon1.png';
import icon2 from '../assets/icons/icon2.png';
import icon3 from '../assets/icons/icon3.png';

const Home = () => {
    return (
        <MainLayout>
            <div className="content"> {/* Contenedor para el contenido */}
                <section>
                    <h2>Descubre la Innovación: Techos Verdes para Perros</h2>

                    <p>En GreenRoof, estamos elevando el estándar de comodidad y bienestar para tus queridas mascotas. Nuestra Casa con Techo Verde no es una vivienda canina común; está diseñada con la sabiduría de la naturaleza para ofrecer un ambiente fresco y acogedor durante todas las estaciones. La innovación radica en su techo verde, que regula la temperatura interna, brindando protección contra el calor extremo y el frío invernal.</p>

                    <p>Pero eso no es todo. Hemos llevado la seguridad al siguiente nivel al incorporar un avanzado sistema de monitoreo. Cada Casa con Techo Verde incluye sensores de temperatura y humedad tanto en el interior como en el exterior, accesibles a través de nuestra aplicación web. Esto te brinda control total sobre el entorno de tu perro, sin importar tu ubicación.</p>

                    <p>Imagina la tranquilidad de saber que tu mascota siempre disfruta de un ambiente saludable y agradable. No solo proporcionas un refugio, sino un hogar inteligente que previene enfermedades y asegura la felicidad de tu amigo de cuatro patas durante toda su vida.</p>


                </section>

                <section className="features">
                    <h2>Características</h2>
                    <div className="features-container">
                        <div className="feature">
                            <Feature
                                icon={icon1}
                                title="Sostenibilidad"
                                description="Ayudamos al medio ambiente y a tu perro al mismo tiempo."
                            />
                        </div>
                        <div className="feature">
                            <Feature
                                icon={icon2}
                                title="Salud"
                                description="Promueve la salud de tu perro con un entorno verde y fresco."
                            />
                        </div>
                        <div className="feature">
                            <Feature
                                icon={icon3}
                                title="Diseño Moderno"
                                description="Añade un toque moderno y elegante a tu hogar."
                            />
                        </div>
                    </div>
                </section>

            </div>

        </MainLayout>
    );
};

export default Home;
