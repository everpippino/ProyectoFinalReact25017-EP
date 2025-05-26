import  { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const RegisterPage = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const { register } = useContext(AuthContext) 
  const navigate = useNavigate() 

  const handleSubmit = (e) => {
    e.preventDefault() 
    if (register(username, password)) { 
      navigate('/login') 
    }
  }

  return (
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
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
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
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="submit"
            className="btn btn-success"
          >
            Registrarse
          </button>        
          <Link to="/login" className="text-decoration-none text-primary fw-bold small">
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage