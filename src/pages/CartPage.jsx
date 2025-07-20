import CartDisplay from '../components/CartDisplay'; 
import { Helmet } from 'react-helmet-async';

const CartPage = () => (
  <div className="container my-5"> 
    <Helmet> 
      <title>Mi Carrito - DoggyShop 🐾</title>
      <meta name="description" content="Revisa los productos que has añadido a tu carrito de compras en DoggyShop." />
      <meta name="keywords" content="carrito de compras, productos de perro, tienda online, DoggyShop" />
    </Helmet>

    <h2 className="h3 fw-bold text-dark mb-4 text-center">Mi Carrito de Compras</h2>
    <CartDisplay /> 
  </div>
);

export default CartPage;