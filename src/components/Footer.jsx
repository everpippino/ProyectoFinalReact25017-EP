import React from 'react';
import { Link } from 'react-router-dom'; // <-- Importa Link de react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">

          {/* Sección de Información de la Empresa/Marca */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-primary">
              The Dog API App
            </h5>
            <p>
              Explorando el fascinante mundo de nuestros amigos caninos. 
              Encuentra información, imágenes y razas de perros con nuestra aplicación.
            </p>
          </div>

          {/* Sección de Servicios/Categorías (usando Link para navegación interna) */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-primary">
              Nuestra App
            </h5>
            <p><Link to="/breeds" className="text-white" style={{ textDecoration: 'none' }}>Galería de Razas</Link></p>
            <p><Link to="/random" className="text-white" style={{ textDecoration: 'none' }}>Imágenes Aleatorias</Link></p>
            <p><Link to="/search" className="text-white" style={{ textDecoration: 'none' }}>Buscador de Perros</Link></p>
            {/* Si tienes rutas específicas para estas funcionalidades, úsalas */}
          </div>

          {/* Sección de Enlaces Útiles (usando Link) */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-primary">
              Enlaces Útiles
            </h5>
            <p><Link to="/profile" className="text-white" style={{ textDecoration: 'none' }}>Mi Perfil</Link></p>
            <p><Link to="/help" className="text-white" style={{ textDecoration: 'none' }}>Centro de Ayuda</Link></p>
            <p><Link to="/contact" className="text-white" style={{ textDecoration: 'none' }}>Contacto</Link></p>
            {/* Más enlaces internos */}
          </div>

          {/* Sección de Contacto (información y WhatsApp con a) */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-primary">
              Contacto
            </h5>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-3" />
              Calle Falsa 123, San Carlos, Buenos Aires
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="me-3" />
              <a href="mailto:info@thedogapi.com" className="text-white" style={{ textDecoration: 'none' }}>
                info@doggyshop.com.ar
              </a>
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="me-3" />
              <a href="tel:+542214567890" className="text-white" style={{ textDecoration: 'none' }}>
                +54 221 456 7890
              </a>
            </p>
            <p>
              <FontAwesomeIcon icon={faWhatsapp} className="me-3" />
              <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer" className="text-white" style={{ textDecoration: 'none' }}>
                +54 9 11 1234-5678
              </a>
              {/* Ajusta este número de WhatsApp con el código de país y número local sin guiones */}
            </p>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Sección de Copyright y Redes Sociales Inferior */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-start">
              &copy; {new Date().getFullYear()} Todos los derechos reservados por:
              <Link to="/" style={{ textDecoration: 'none' }}> {/* Enlace al inicio */}
                <strong className="text-primary"> Doggy Shop</strong>
              </Link>
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a href="https://www.facebook.com/tupagina" target="_blank" rel="noopener noreferrer" className="btn-floating btn-sm text-white" style={{ fontSize: '23px' }}>
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.twitter.com/tuusuario" target="_blank" rel="noopener noreferrer" className="btn-floating btn-sm text-white" style={{ fontSize: '23px' }}>
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.instagram.com/tuusuario" target="_blank" rel="noopener noreferrer" className="btn-floating btn-sm text-white" style={{ fontSize: '23px' }}>
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.linkedin.com/in/tuperfil" target="_blank" rel="noopener noreferrer" className="btn-floating btn-sm text-white" style={{ fontSize: '23px' }}>
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" className="btn-floating btn-sm text-white" style={{ fontSize: '23px' }}>
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </li>
                 <li className="list-inline-item">
                  <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer" className="btn-floating btn-sm text-white" style={{ fontSize: '23px' }}>
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;