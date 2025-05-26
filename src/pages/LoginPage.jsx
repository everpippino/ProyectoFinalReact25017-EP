import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const LoginPage = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext) 
  const navigate = useNavigate() 

  const handleSubmit = (e) => {
    e.preventDefault() 
    if (login(username, password)) { 
      navigate('/dashboard') 
    }
  }

  return (
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
            className="form-control" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
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
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Iniciar Sesión
          </button>     
          <Link to="/registro" className="text-decoration-none text-primary fw-bold small">
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage