import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="card shadow-sm p-4 mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <Helmet> 
        <title>Iniciar Sesión - DoggyShop 🐾</title>
        <meta name="description" content="Inicia sesión en tu cuenta de DoggyShop para acceder a tu dashboard y gestionar tus pedidos." />
      </Helmet>

      <h2 className="h4 fw-bold text-dark mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} aria-label="Formulario de inicio de sesión">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Usuario:
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-required="true" 
            aria-label="Nombre de usuario" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true" 
            aria-label="Contraseña" 
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="submit"
            className="btn btn-primary"
            aria-label="Iniciar sesión" 
          >
            Iniciar Sesión
          </button>
          <Link
            to="/registro"
            className="text-decoration-none text-primary fw-bold small"
            role="link" 
            aria-label="Ir a la página de registro" 
          >
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;