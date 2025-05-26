import  { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const RegisterPage = () => {
  const [username, setUsername] = useState('') // Estado para el nombre de usuario
  const [password, setPassword] = useState('') // Estado para la contraseña
  const { register } = useContext(AuthContext) // Obtiene la función de registro del contexto
  const navigate = useNavigate() 

  // Maneja el envío del formulario de registro
  const handleSubmit = (e) => {
    e.preventDefault() // Previene el comportamiento por defecto del formulario
    if (register(username, password)) { // Intenta registrar al usuario
      navigate('/login') // Si el registro es exitoso, redirige a la página de login
    }
    // Las alertas de éxito o error se manejan dentro de la función `register` en AuthContext
  }

  return (
    // Contenedor principal del formulario de registro con estilos de Bootstrap
    <div className="card shadow-sm p-4 mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="h4 fw-bold text-dark mb-4 text-center">Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="reg-username" className="form-label">
            Usuario:
          </label>
          <input
            type="text"
            id="reg-username"
            className="form-control" // Clase de Bootstrap para el input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required // Campo requerido
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reg-password" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            id="reg-password"
            className="form-control" // Clase de Bootstrap para el input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Campo requerido
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="submit"
            className="btn btn-success" // Estilos de botón de Bootstrap
          >
            Registrarse
          </button>
          {/* Enlace a la página de inicio de sesión usando Link de React Router */}
          <Link to="/login" className="text-decoration-none text-primary fw-bold small">
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage