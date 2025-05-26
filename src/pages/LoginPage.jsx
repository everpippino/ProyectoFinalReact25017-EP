import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const LoginPage = () => {
  const [username, setUsername] = useState('') // Estado para el nombre de usuario
  const [password, setPassword] = useState('') // Estado para la contraseña
  const { login } = useContext(AuthContext) // Obtiene la función de login del contexto
  const navigate = useNavigate() // Hook para la navegación programática

  // Maneja el envío del formulario de inicio de sesión
  const handleSubmit = (e) => {
    e.preventDefault() // Previene el comportamiento por defecto del formulario
    if (login(username, password)) { // Intenta iniciar sesión
      navigate('/dashboard') // Si el login es exitoso, redirige al dashboard
    }
    // Las alertas de éxito o error se manejan dentro de la función `login` en AuthContext
  }

  return (
    // Contenedor principal del formulario de inicio de sesión con estilos de Bootstrap
    <div className="card shadow-sm p-4 mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="h4 fw-bold text-dark mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Usuario:
          </label>
          <input
            type="text"
            id="username"
            className="form-control" // Clase de Bootstrap para el input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required // Campo requerido
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            className="form-control" // Clase de Bootstrap para el input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Campo requerido
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="submit"
            className="btn btn-primary" // Estilos de botón de Bootstrap
          >
            Iniciar Sesión
          </button>
          {/* Enlace a la página de registro usando Link de React Router */}
          <Link to="/registro" className="text-decoration-none text-primary fw-bold small">
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage