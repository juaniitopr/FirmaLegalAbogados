import React from 'react';
import './footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Botón de volver arriba */}
      <div className="back-to-top">
        <a href="#top" className="top-button">
          <FaArrowUp className="top-icon" />
        </a>
      </div>

      {/* Contenido principal del footer */}
      <div className="footer-content">
        {/* Logo y nombre de la empresa */}
        <div className="footer-brand">
          <h1 className="footer-logo">
            L<span className="logo-amp">&</span>O
          </h1>
          <p className="footer-slogan">Soluciones legales profesionales</p>
        </div>

        {/* Columnas de enlaces */}
        <div className="footer-columns">
          {/* Columna 1: Sobre la empresa */}
          <div className="footer-column">
            <h4 className="column-title">Sobre la empresa</h4>
            <ul className="column-links">
              <li><a href="#" className="footer-link">Nosotros</a></li>
              <li><a href="#" className="footer-link">Servicios</a></li>
              <li><a href="#" className="footer-link">Política de privacidad</a></li>
              <li><a href="#" className="footer-link">Términos y condiciones</a></li>
            </ul>
          </div>

          {/* Columna 2: Ayuda */}
          <div className="footer-column">
            <h4 className="column-title">Ayuda</h4>
            <ul className="column-links">
              <li><a href="#" className="footer-link">Preguntas frecuentes</a></li>
              <li><a href="#" className="footer-link">Guías de uso</a></li>
              <li><a href="#" className="footer-link">Soporte técnico</a></li>
              <li><a href="#" className="footer-link">Estado del servicio</a></li>
            </ul>
          </div>

          {/* Columna 3: Mapa */}
          <div className="footer-column">
            <h4 className="column-title">Ubicación</h4>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.1613846176274!2d-74.11314331793363!3d4.594600098219463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9990d809d241%3A0x6e0b59f1d6d82830!2ssena%201%20mayo!5e0!3m2!1ses!2sco!4v1726417777630!5m2!1ses!2sco"
                className="footer-map"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de la oficina"
              ></iframe>
            </div>
          </div>

          {/* Columna 4: Contacto */}
          <div className="footer-column">
            <h4 className="column-title">Contacto</h4>
            <div className="contact-info">
              <p className="contact-item">
                LOFirmaLegalAbogados@gmail.com
              </p>
              <p className="contact-item">
                +57 322 9533079
              </p>
              <p className="contact-item">
                Calle 123, Bogotá, Colombia
              </p>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebookF className="social-icon" />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter className="social-icon" />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram className="social-icon" />
              </a>
              <a href="#" className="social-link" aria-label="WhatsApp">
                <FaWhatsapp className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p className="copyright">
          &copy; {new Date().getFullYear()} L&O Soluciones Legales. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;