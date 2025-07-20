import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async'; 


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './components/Contact';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';


import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';


import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartContext';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <Router>      
      <HelmetProvider> 
        <AuthProvider>
          <CartProvider>
            <div className="d-flex flex-column min-vh-100">
              <Navbar />

              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/productos" element={<ProductsPage />} />
                  <Route path="/productos/:productId" element={<ProductDetailPage />} />
                  <Route path="/carrito" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/registro" element={<RegisterPage />} />
                  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                  
                 
                  <Route path="/add-product" element={<ProtectedRoute><AddProductPage /></ProtectedRoute>} />
                  <Route path="/edit-product/:productId" element={<ProtectedRoute><EditProductPage /></ProtectedRoute>} />

                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              <Footer />
            </div>            
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          </CartProvider>
        </AuthProvider>
      </HelmetProvider> 
    </Router>
  );
}

export default App;
