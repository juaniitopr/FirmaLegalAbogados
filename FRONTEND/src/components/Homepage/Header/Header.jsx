import React, { useState } from 'react';
import Login from '../../Login/Login'; 
import './header.css';
import { FaArrowDown } from 'react-icons/fa';

// ✅ Importar imágenes
import logo from '../../../assets/img/Logo.png';
import principal1 from '../../../assets/img/Principal1.png';
import principal2 from '../../../assets/img/Principal2.png';
import principal3 from '../../../assets/img/Principal3.png';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openLoginSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeLoginSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <header>
      <div className="todo-homepage">
        <div className="header-homepage" id="principal">
          <div className="imagen-logo-homepage">
            {/* ✅ Usar imagen importada */}
            <img src={logo} className="logo-homepage" alt="Logo" />
          </div>
          <div className="banner-contenido-homepage">
            <h1 className="P1-homepage">L<span className="P2-homepage">&</span>O</h1>
          </div>
          <div className="navegacion-homepage">
            <nav>
              <button className="nav-button-homepage" id="loginBtn" onClick={openLoginSidebar}>ACCEDER</button>
            </nav>
          </div>
        </div>

        {/* Componente Login */}
        <Login isOpen={isSidebarOpen} closeLogin={closeLoginSidebar} />

        {/* Carrusel con imágenes importadas */}
        <div className="Imagen-Principal">
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={principal1} className="d-block w-100" alt="..." />
                <div className="titulo">
                  <h3>L & O FIRMA LEGAL ABOGADOS</h3>
                </div>
                <div className="carousel-caption d-none d-md-block">
                  <p>Cada cliente es una prioridad, cada caso una oportunidad de servir mejor.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={principal2} className="d-block w-100" alt="..." />
                <div className="titulo">
                  <h3>L & O FIRMA LEGAL ABOGADOS</h3>
                </div>
                <div className="carousel-caption d-none d-md-block">
                  <p>Expertos en soluciones legales efectivas.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={principal3} className="d-block w-100" alt="..." />
                <div className="titulo">
                  <h3>L & O FIRMA LEGAL ABOGADOS</h3>
                </div>
                <div className="carousel-caption d-none d-md-block">
                  <p>En L & O, defendemos tu futuro legal.</p>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="frase-homepage">
          <p>"Tu confianza, nuestro compromiso".</p>
        </div>

        <div className="Medio-homepage" id="procesos">
          <br />
          <a href="#procesos" className="scroll-down-button">
            <FaArrowDown className="scroll-down-icon" />
          </a>
        </div>
      </div>

      <div className="Titulo-Procesos-homepage">
        <h1><br />¿EN QUÉ PODEMOS AYUDARTE?</h1>
      </div>
    </header>
  );
};

export default Header;
