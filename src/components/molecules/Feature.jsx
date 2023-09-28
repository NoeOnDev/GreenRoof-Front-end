import React from 'react';
import '../../assets/styles/Feature.css';

const Feature = ({ icon, title, description }) => {
    return (
        <div className="feature"> {/* Agrega una clase "feature" al contenedor */}
            <img src={icon} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Feature;
