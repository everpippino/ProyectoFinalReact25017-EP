import React, { useState, createContext } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); 

  // Función para añadir un producto al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id); // Busca si el producto ya está en el carrito
      if (existingItem) {
        // Si el producto ya existe, actualiza su cantidad
        toast.success(`Cantidad de ${product.name} actualizada a ${existingItem.quantity + 1}.`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: `cart-update-${product.id}` 
        });
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si el producto no existe, lo añade al carrito con cantidad 1
        toast.success(`${product.name} ha sido añadido al carrito.`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: `cart-add-${product.id}` 
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
        toast.info(`Se ha quitado una unidad de ${itemToRemove.name}.`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: `cart-remove-one-${productId}` // <-- Añadido
        });
        return prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else if (itemToRemove && itemToRemove.quantity === 1) {
        // Si el producto tiene solo una unidad, lo elimina completamente
        toast.warn(`${itemToRemove.name} ha sido eliminado del carrito.`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: `cart-remove-full-${productId}` // <-- Añadido
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
        toast.warn(`${itemRemoved.name} ha sido completamente eliminado del carrito.`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: `cart-remove-fully-${productId}` // <-- Añadido
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
        toast.info('Tu carrito ha sido vaciado.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: 'cart-cleared' // <-- Añadido
        });
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

// Exporta tanto el Contexto como el Proveedor para que puedan ser importados por otros componentes
export { CartContext, CartProvider };
