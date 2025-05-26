// --- src/context/CartProvider.jsx ---
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { CartContext } from './CartContext'

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
 
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        Swal.fire({
          icon: 'success',
          title: 'Cantidad actualizada',
          text: `${product.name} (x${existingItem.quantity + 1})`,
          toast: true, 
          position: 'top-end',
          showConfirmButton: false, 
          timer: 1500 
        });
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Producto añadido',
          text: `${product.name} ha sido añadido al carrito.`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove && itemToRemove.quantity > 1) {
        Swal.fire({
          icon: 'info',
          title: 'Cantidad disminuida',
          text: `Se ha quitado una unidad de ${itemToRemove.name}.`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });
        return prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else if (itemToRemove && itemToRemove.quantity === 1) {
        Swal.fire({
          icon: 'warning',
          title: 'Producto eliminado',
          text: `${itemToRemove.name} ha sido eliminado del carrito.`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems; 
    });
  };

  const removeItemFully = (productId) => {
    setCartItems(prevItems => {
      const itemRemoved = prevItems.find(item => item.id === productId);
      if (itemRemoved) {
        Swal.fire({
          icon: 'warning',
          title: 'Producto eliminado',
          text: `${itemRemoved.name} ha sido completamente eliminado del carrito.`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres vaciar todo el carrito?",
      icon: 'warning',
      showCancelButton: true, 
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) { 
        setCartItems([]); 
        Swal.fire(
          '¡Vaciado!',
          'Tu carrito ha sido vaciado.',
          'success'
        );
      }
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalItems, removeItemFully }}>
      {children}
    </CartContext.Provider>
  );
};


export default CartProvider;