
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async'; 

const DashboardPage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="text-center p-5 bg-white rounded shadow-sm">
      <Helmet> 
        <title>Dashboard de {currentUser?.username || 'Usuario'} - DoggyShop 🐾</title>
        <meta name="description" content={`Panel de control del usuario ${currentUser?.username || 'autenticado'} en DoggyShop. Accede a tus configuraciones y actividades.`} />
      </Helmet>

      <h2 className="display-4 fw-bold text-dark mb-4">Bienvenido al Dashboard, {currentUser?.username || 'Usuario'}!</h2>
      <p className="lead text-muted">Esta es una página protegida a la que solo los usuarios autenticados pueden acceder.</p>
      <div className="mt-5">
        <img
          src="https://placehold.co/600x300/ADD8E6/000000?text=Dashboard+Seguro"
          alt="Dashboard Seguro: Ilustración de un panel de control con elementos de seguridad" 
          className="img-fluid rounded shadow"
        />
      </div>
    </div>
  );
};

export default DashboardPage;