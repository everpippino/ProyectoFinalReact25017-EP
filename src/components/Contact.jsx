import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {
  faWhatsapp,
  faFacebook, // Añadimos Facebook e Instagram para los íconos sociales
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

// No necesitamos un archivo CSS específico para Contact.jsx si usamos Bootstrap,
// a menos que quieras estilos muy personalizados que Bootstrap no cubra.
// import './Contact.css'; // ¡Probablemente puedas eliminar esta línea!

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    setFormData({ name: '', email: '', message: '' }); // Limpiar el formulario
  };

  return (
    <div className="container my-5"> {/* Contenedor principal con margen vertical */}
      <h1 className="text-center mb-4 text-primary">Contáctanos</h1> {/* Título centrado */}
      <p className="text-center lead mb-5">
        ¿Tienes alguna pregunta o quieres trabajar con nosotros? ¡Envíanos un mensaje!
      </p>

      <div className="row g-4 justify-content-center"> {/* Fila con columnas, gap entre ellas */}
        {/* Sección de Información de Contacto */}
        <div className="col-md-5"> {/* Columna para información, ocupa 5 de 12 en pantallas medias */}
          <div className="card shadow-sm h-100"> {/* Tarjeta con sombra y altura 100% */}
            <div className="card-body">
              <h2 className="card-title text-info mb-3">Información de Contacto</h2>
              <ul className="list-unstyled"> {/* Lista sin estilos por defecto */}
                <li className="mb-3">
                  <FontAwesomeIcon icon={faEnvelope} className="me-3 text-primary" />
                  Email: <a href="mailto:info@tudominio.com">info@doggyshop.com.ar</a>
                </li>
                <li className="mb-3">
                  <FontAwesomeIcon icon={faPhone} className="me-3 text-primary" />
                  Teléfono: <a href="tel:+1234567890">+123 456 7890</a>
                </li>
                <li className="mb-3">
                  <FontAwesomeIcon icon={faWhatsapp} className="me-3 text-primary" />
                  WhatsApp: <a href="https://wa.me/XXXXXXXXXXX" target="_blank" rel="noopener noreferrer">+123 456 7890</a>
                  {/* Reemplaza XXXXXXXXXXX con tu número de WhatsApp sin el + */}
                </li>
                <li className="mb-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-3 text-primary" />
                  Dirección: Calle Falsa 123, San Carlos, Buenos Aires, Argentina
                </li>
              </ul>

              <h3 className="mt-4 mb-3 text-info">Encuéntranos en redes</h3>
              <div className="d-flex social-icons"> {/* Flexbox para los íconos sociales */}
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary me-3">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                {/* Añade más íconos de redes sociales si lo deseas */}
              </div>
            </div>
          </div>
        </div>

        {/* Sección del Formulario de Contacto */}
        <div className="col-md-5"> {/* Columna para el formulario, ocupa 5 de 12 en pantallas medias */}
          <div className="card shadow-sm h-100"> {/* Tarjeta con sombra y altura 100% */}
            <div className="card-body">
              <h2 className="card-title text-info mb-3">Envíanos un Mensaje</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3"> {/* Margen inferior para cada grupo de formulario */}
                  <label htmlFor="name" className="form-label">Nombre:</label>
                  <input
                    type="text"
                    className="form-control" // Clase de Bootstrap para inputs
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control" // Clase de Bootstrap para inputs
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Mensaje:</label>
                  <textarea
                    className="form-control" // Clase de Bootstrap para textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Enviar Mensaje</button> {/* Botón primario de Bootstrap, ancho completo */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;