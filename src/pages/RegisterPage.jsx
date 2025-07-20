
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async'; 

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register(username, password)) {
      navigate('/login');
    }
  };

  return (
    <div className="card shadow-sm p-4 mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <Helmet> 
        <title>Registrarse - DoggyShop 🐾</title>
        <meta name="description" content="Crea una nueva cuenta en DoggyShop para empezar a explorar y comprar productos para tus mascotas." />
      </Helmet>

      <h2 className="h4 fw-bold text-dark mb-4 text-center">Registrarse</h2>
      <form onSubmit={handleSubmit} aria-label="Formulario de registro de usuario"> 
        <div className="mb-3">
          <label htmlFor="reg-username" className="form-label">
            Usuario:
          </label>
          <input
            type="text"
            id="reg-username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-required="true" 
            aria-label="Nombre de usuario para registro" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reg-password" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            id="reg-password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true" 
            aria-label="Contraseña para registro" 
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="submit"
            className="btn btn-success"
            aria-label="Registrar nueva cuenta" 
          >
            Registrarse
          </button>
          <Link
            to="/login"
            className="text-decoration-none text-primary fw-bold small"
            role="link" 
            aria-label="Ir a la página de inicio de sesión" 
          >
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;