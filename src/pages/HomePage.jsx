import { Link } from 'react-router-dom';
import { Dog } from 'lucide-react';
import { Helmet } from 'react-helmet-async'; 

const HomePage = () => (
  <div className="text-center p-5 bg-white rounded shadow-sm">
    <Helmet> 
      <title>DoggyShop 🐾 - Tu Tienda Online de Razas Caninas</title>
      <meta name="description" content="Explora nuestra increíble colección de razas de perros y productos para tus amigos caninos. Encuentra tu compañero perfecto." />
      <meta name="keywords" content="perros, razas de perros, Dog API, tienda de mascotas, DoggyShop, comprar perros" />
      <meta property="og:title" content="DoggyShop 🐾 - Tu Tienda Online de Razas Caninas" />
      <meta property="og:description" content="Explora nuestra increíble colección de razas de perros y productos para tus amigos caninos. Encuentra tu compañero perfecto." />
      <meta property="og:type" content="website" />
      
    </Helmet>

    <h2 className="display-4 fw-bold text-dark mb-4">¡Bienvenido a DoggyShop!</h2>
    <p className="lead text-muted mb-5">Explora nuestra increíble colección de razas de perros.</p>
    
    <Link
      to="/productos"
      className="btn btn-primary btn-lg shadow"
      role="button" 
      aria-label="Ver todos nuestros productos caninos" 
    >
      Ver Productos <Dog className="ms-2" size={24} aria-hidden="true" /> 
    </Link>
    <div className="mt-5">
      <img
        src="https://placehold.co/800x400/ADD8E6/000000?text=Perros+Felices"
        alt="Perros Felices jugando en un campo" 
        className="img-fluid rounded shadow"
      />
    </div>
  </div>
);

export default HomePage;