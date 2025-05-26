// --- src/context/CartProvider.jsx ---
import React, { useState, createContext } from 'react'; // Importa React, useState y createContext
import Swal from 'sweetalert2'; // Importa SweetAlert2

// Importa el contexto del carrito de compras que definimos en CartContext.jsx
import { CartContext } from './CartContext';

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Estado para almacenar los ítems del carrito

  // Función para añadir un producto al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id); // Busca si el producto ya está en el carrito
      if (existingItem) {
        // Si el producto ya existe, actualiza su cantidad
        Swal.fire({
          icon: 'success',
          title: 'Cantidad actualizada',
          text: `${product.name} (x${existingItem.quantity + 1})`,
          toast: true, // Muestra la alerta como una "tostada" (pequeña notificación)
          position: 'top-end', // Posición de la tostada
          showConfirmButton: false, // No muestra el botón de confirmación
          timer: 1500 // Desaparece después de 1.5 segundos
        });
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si el producto no existe, lo añade al carrito con cantidad 1
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

  // Función para remover una unidad de un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === productId); // Busca el ítem a remover
      if (itemToRemove && itemToRemove.quantity > 1) {
        // Si el producto tiene más de una unidad, disminuye la cantidad
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
        // Si el producto tiene solo una unidad, lo elimina completamente
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
      return prevItems; // No hace nada si el ítem no existe
    });
  };

  // Función para eliminar completamente un producto del carrito, sin importar la cantidad
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

  // Función para vaciar todo el carrito
  const clearCart = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres vaciar todo el carrito?",
      icon: 'warning',
      showCancelButton: true, // Muestra el botón de cancelar
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) { // Si el usuario confirma la acción
        setCartItems([]); // Vacía el array de ítems del carrito
        Swal.fire(
          '¡Vaciado!',
          'Tu carrito ha sido vaciado.',
          'success'
        );
      }
    });
  };

  // Función para obtener el número total de ítems en el carrito
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    // Proporciona los valores y funciones del carrito a los componentes hijos
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalItems, removeItemFully }}>
      {children}
    </CartContext.Provider>
  );
};

// Exporta el Proveedor para que pueda ser importado por otros componentes
export default CartProvider;