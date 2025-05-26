import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogIn, LogOut, Home, Dog } from 'lucide-react'
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';


const Navbar = () => {  
  const { isAuthenticated, currentUser, logout } = useContext(AuthContext)
  const { getTotalItems } = useContext(CartContext)
  const navigate = useNavigate()

  // Función para manejar el cierre de sesión y redirigir
  const handleLogout = () => {
    logout(); 
  };

  return (
    <nav>
      <ul className="nav"> 
        <li className="nav-item">
          <Link to="/" className="nav-link text-white d-flex align-items-center"> 
            <Home size={20} className="me-1" /> 
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
            {getTotalItems() > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </li>        
        {isAuthenticated ? (
          <>
            <li className="nav-item">             
              <Link to="/dashboard" className="nav-link text-white d-flex align-items-center">
                <User size={20} className="me-1" />
                {currentUser?.username || 'Dashboard'}
              </Link>
            </li>
            <li className="nav-item">              
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