// --- src/components/Navbar.jsx ---
import React, { useContext } from 'react'; // Importa useContext
import { Link, useNavigate } from 'react-router-dom'; // Importa Link y useNavigate
import { ShoppingCart, User, LogIn, LogOut, Home, Dog } from 'lucide-react'; // Importa los iconos

// Importa los contextos necesarios desde sus archivos modulares
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';


const Navbar = () => {
  // Usamos useContext para acceder a los valores de los contextos
  const { isAuthenticated, currentUser, logout } = useContext(AuthContext); // Añadimos currentUser
  const { getTotalItems } = useContext(CartContext);
  const navigate = useNavigate(); // Hook para navegación programática de React Router

  // Función para manejar el cierre de sesión y redirigir
  const handleLogout = () => {
    logout(); // Llama a la función de logout del AuthContext
    // La redirección a '/login' se maneja dentro de la función `logout` en AuthProvider.jsx
    // Por lo tanto, no es necesario `navigate('/login')` aquí directamente,
    // ya que `logout()` ya lo hace.
  };

  return (
    <nav>
      <ul className="nav"> {/* Clase de Bootstrap para lista de navegación */}
        <li className="nav-item"> {/* Clase de Bootstrap para cada elemento de la lista */}
          <Link to="/" className="nav-link text-white d-flex align-items-center"> {/* Link de React Router */}
            <Home size={20} className="me-1" /> {/* Icono de Lucide React con margen derecho de Bootstrap */}
            Inicio
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/productos" className="nav-link text-white d-flex align-items-center">
            <Dog size={20} className="me-1" />
            Productos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/carrito" className="nav-link text-white d-flex align-items-center position-relative">
            <ShoppingCart size={20} className="me-1" />
            Carrito
            {/* Muestra el número total de ítems en el carrito si es mayor que 0 */}
            {getTotalItems() > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </li>
        {/* Renderizado condicional basado en si el usuario está autenticado */}
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              {/* Muestra el nombre de usuario si está logueado */}
              <Link to="/dashboard" className="nav-link text-white d-flex align-items-center">
                <User size={20} className="me-1" />
                {currentUser?.username || 'Dashboard'} {/* Muestra el nombre de usuario o 'Dashboard' como fallback */}
              </Link>
            </li>
            <li className="nav-item">
              {/* Botón para cerrar sesión, que llama a handleLogout */}
              <button onClick={handleLogout} className="btn btn-link text-white text-decoration-none d-flex align-items-center">
                <LogOut size={20} className="me-1" />
                Salir
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link text-white d-flex align-items-center">
                <LogIn size={20} className="me-1" />
                Iniciar Sesión
              </Link>
            </li>
            {/* Si el usuario NO está autenticado, muestra el enlace de Registrarse */}
            {!isAuthenticated && (
              <li className="nav-item">
                <Link to="/registro" className="nav-link text-white d-flex align-items-center">
                  <User size={20} className="me-1" />
                  Registrarse
                </Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;