
import { useState} from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('userToken') ? true : false;
  });
  const [currentUser, setCurrentUser] = useState(() => {    
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });

 
  const navigate = useNavigate();

  const login = (username, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = registeredUsers.find(u => u.username === username && u.password === password);

    if (foundUser) {
      const token = `fake-token-${username}`; 
      const user = { username: username };
      localStorage.setItem('userToken', token); 
      localStorage.setItem('currentUser', JSON.stringify(user));
      setIsAuthenticated(true); 
      setCurrentUser(user); 
      Swal.fire({ 
        icon: 'success',
        title: '¡Bienvenido!',
        text: `Has iniciado sesión como ${username}.`,
        timer: 2000, 
        showConfirmButton: false 
      });
      return true; 
    } else {
      
      Swal.fire({ 
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Usuario o contraseña incorrectos.',
      });
      return false; 
    }
  };

  const register = (username, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = existingUsers.some(u => u.username === username);

    if (userExists) {      
      Swal.fire({ 
        icon: 'error',
        title: 'Error de registro',
        text: 'El usuario ya existe.',
      });
      return false;
    }
    
    const newUser = { username, password };
    localStorage.setItem('registeredUsers', JSON.stringify([...existingUsers, newUser]));
    Swal.fire({ 
      icon: 'success',
      title: '¡Registro exitoso!',
      text: 'Ahora puedes iniciar sesión con tu nueva cuenta.',
      timer: 2000,
      showConfirmButton: false
    });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false); 
    setCurrentUser(null); 
    Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'Has cerrado tu sesión.',
      timer: 1500,
      showConfirmButton: false
    });    
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;