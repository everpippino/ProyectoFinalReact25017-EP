import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('userToken') ? true : false;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });

  const login = (username, password) => {
    if (username && password) {
      const token = `fake-token-${username}`;
      const user = { username: username };
      localStorage.setItem('userToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setIsAuthenticated(true);
      setCurrentUser(user);
      toast.success(`¡Bienvenido, ${username}!`, { 
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return true;
    }
    toast.error('Nombre de usuario o contraseña incorrectos.', { 
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return false;
  };

  const register = (username, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = existingUsers.some(u => u.username === username);

    if (userExists) {
      toast.error('El usuario ya existe. Por favor, elige otro nombre de usuario.', { 
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    const newUser = { username, password };
    localStorage.setItem('registeredUsers', JSON.stringify([...existingUsers, newUser]));
    toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.', { 
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return true;
  };

  const logout = () => {    
    Swal.fire({ 
      title: '¿Cerrar sesión?',
      text: "¿Estás seguro de que quieres cerrar tu sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('currentUser');
        setIsAuthenticated(false);
        setCurrentUser(null);
        toast.info('Has cerrado tu sesión exitosamente.', { 
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const authContextValue = {
    isAuthenticated,
    currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };