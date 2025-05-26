// --- src/App.jsx (Componente Principal de la Aplicación) ---
import React from 'react'; // Importa React
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa componentes de React Router

// Importa los proveedores de contexto (exportados por defecto de sus archivos)
import AuthProvider from './context/AuthProvider';
import CartProvider from './context/CartProvider';

// Importa el componente de layout principal
import Layout from './components/Layout';
import Contact from './components/Contact'; 
// Importa los componentes de página
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Importa el componente de ruta protegida
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    // Envuelve toda la aplicación con BrowserRouter primero
    <BrowserRouter>
      {/* Ahora, los proveedores de contexto están dentro del contexto del Router */}
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/productos" element={<ProductsPage />} />
              <Route path="/productos/:productId" element={<ProductDetailPage />} />
              <Route path="/contact" element={<Contact />} /> 
              {/* Protegemos la ruta del carrito con ProtectedRoute */}
              <Route path="/carrito" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
