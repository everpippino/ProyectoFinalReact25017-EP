
import { useState, createContext } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

// Importa el contexto de autenticación que definimos en AuthContext.jsx
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Inicializa el estado de autenticación desde localStorage
    // Comprueba si existe un token de usuario para determinar si está autenticado
    return localStorage.getItem('userToken') ? true : false;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    // Recupera la información del usuario actual desde localStorage
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });

  // Hook para la navegación programática (usado para redirigir después del login/logout)
  const navigate = useNavigate();

  const login = (username, password) => {
    // Simulación de login: en un proyecto real, esta lógica se comunicaría con un backend
    // Para esta simulación, buscamos el usuario en los usuarios registrados en localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = registeredUsers.find(u => u.username === username && u.password === password);

    if (foundUser) {
      // Si el usuario es encontrado y las credenciales coinciden
      const token = `fake-token-${username}`; // Genera un token simulado
      const user = { username: username }; // Objeto de usuario simulado
      localStorage.setItem('userToken', token); // Guarda el token en localStorage
      localStorage.setItem('currentUser', JSON.stringify(user)); // Guarda la información del usuario
      setIsAuthenticated(true); // Actualiza el estado de autenticación
      setCurrentUser(user); // Establece el usuario actual
      Swal.fire({ // Muestra una alerta de éxito con SweetAlert2
        icon: 'success',
        title: '¡Bienvenido!',
        text: `Has iniciado sesión como ${username}.`,
        timer: 2000, // La alerta desaparecerá después de 2 segundos
        showConfirmButton: false // No muestra el botón de confirmación
      });
      return true; // Indica que el inicio de sesión fue exitoso
    } else {
      // Si las credenciales no coinciden o el usuario no existe
      Swal.fire({ // Muestra una alerta de error con SweetAlert2
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Usuario o contraseña incorrectos.',
      });
      return false; // Indica que el inicio de sesión falló
    }
  };

  const register = (username, password) => {
    // Simulación de registro: en un proyecto real, esto iría a un backend
    // Para esta simulación, comprobamos si el usuario ya existe en localStorage
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = existingUsers.some(u => u.username === username);

    if (userExists) {
      // Si el usuario ya existe
      Swal.fire({ // Muestra una alerta de error
        icon: 'error',
        title: 'Error de registro',
        text: 'El usuario ya existe.',
      });
      return false; // Indica que el registro falló
    }

    // Si el usuario no existe, lo registramos
    const newUser = { username, password }; // Crea un nuevo objeto de usuario
    localStorage.setItem('registeredUsers', JSON.stringify([...existingUsers, newUser])); // Añade el nuevo usuario a la lista
    Swal.fire({ // Muestra una alerta de éxito
      icon: 'success',
      title: '¡Registro exitoso!',
      text: 'Ahora puedes iniciar sesión con tu nueva cuenta.',
      timer: 2000,
      showConfirmButton: false
    });
    return true; // Indica que el registro fue exitoso
  };

  const logout = () => {
    localStorage.removeItem('userToken'); // Elimina el token de usuario
    localStorage.removeItem('currentUser'); // Elimina la información del usuario
    setIsAuthenticated(false); // Actualiza el estado de autenticación
    setCurrentUser(null); // Borra el usuario actual
    Swal.fire({ // Muestra una alerta informativa
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'Has cerrado tu sesión.',
      timer: 1500,
      showConfirmButton: false
    });
    // Redirigir a login después de cerrar sesión
    navigate('/login');
  };

  return (
    // Proporciona los valores de autenticación a los componentes hijos
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;