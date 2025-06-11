import React from 'react';
import logo from '../../assets/img/Logo.png';

function Imagen() {
    return(
        <img 
            src={logo} 
            alt="Logo de la firma legal" 
            width={'100px'} 
            height={'100px'} 
        />
    );
}

export default Imagen;
