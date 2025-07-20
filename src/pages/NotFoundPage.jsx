import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => (
  <div className="text-center p-5 bg-white rounded shadow-sm">
    <Helmet> 
      <title>Página No Encontrada (404) - DoggyShop 🐾</title>
      <meta name="description" content="La página que buscas no existe en DoggyShop. Por favor, verifica la URL o vuelve al inicio." />
    </Helmet>

    <h2 className="display-4 fw-bold text-dark mb-4">404 - Página No Encontrada</h2>
    <p className="lead text-muted mb-5">Lo sentimos, la página que buscas no existe.</p>
    <Link
      to="/"
      className="btn btn-primary btn-lg"
      role="link" 
      aria-label="Volver a la página de inicio" 
    >
      Volver al Inicio
    </Link>
  </div>
);

export default NotFoundPage;