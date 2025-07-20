import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogIn, LogOut, Home, Dog, Mail, Plus } from 'lucide-react';

import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';


const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Dog size={24} className="me-2" />
          The Dog API App
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link d-flex align-items-center">
                <Home size={20} className="me-1" />
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/productos" className="nav-link d-flex align-items-center">
                <Dog size={20} className="me-1" />
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link d-flex align-items-center">
                <Mail size={20} className="me-1" />
                Contacto
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/carrito" className="nav-link d-flex align-items-center position-relative">
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
                  <Link to="/dashboard" className="nav-link d-flex align-items-center">
                    <User size={20} className="me-1" />
                    {currentUser?.username || 'Dashboard'}
                  </Link>
                </li>              
                <li className="nav-item">
                  <Link to="/add-product" className="nav-link d-flex align-items-center">
                    <Plus size={20} className="me-1" /> 
                    Agregar Producto
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-link nav-link d-flex align-items-center">
                    <LogOut size={20} className="me-1" />
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link d-flex align-items-center">
                    <LogIn size={20} className="me-1" />
                    Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/registro" className="nav-link d-flex align-items-center">
                    <User size={20} className="me-1" />
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;