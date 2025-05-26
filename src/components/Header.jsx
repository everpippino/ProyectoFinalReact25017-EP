// --- src/components/Header.jsx ---
import React from 'react'; // Importa React
import { Link } from 'react-router-dom'; // Importa Link de React Router para la navegación
import Navbar from './Navbar'; // Importa el componente Navbar (asumiendo que está en la misma carpeta)

const Header = () => (
  <header className="bg-primary py-3 shadow-sm"> {/* Header con fondo primario de Bootstrap y sombra */}
    <div className="container d-flex justify-content-between align-items-center"> {/* Contenedor de Bootstrap con flexbox para alinear elementos */}
      <h1 className="h3 text-white mb-0"> {/* Título de la tienda */}
        <Link to="/" className="text-white text-decoration-none"> {/* Enlace al inicio */}
          DoggyShop 🐾
        </Link>
      </h1>
      <Navbar /> {/* Renderiza el componente Navbar */}
    </div>
  </header>
);

export default Header;