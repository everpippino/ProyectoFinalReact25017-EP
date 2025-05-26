
import { useContext } from 'react'
import { ShoppingCart } from 'lucide-react'
import CartItem from './CartItem'
import { CartContext } from '../context/CartContext'

const CartDisplay = () => {
  // Obtiene los ítems del carrito, la función para vaciarlo y el total de ítems del contexto
  const { cartItems, clearCart, getTotalItems } = useContext(CartContext)

  // Si el carrito está vacío, muestra un mensaje
  if (getTotalItems() === 0) {
    return (
      <div className="text-center p-5 bg-white rounded shadow-sm">
        <ShoppingCart size={48} className="text-muted mb-4" /> {/* Icono de carrito */}
        <p className="fs-5 text-muted">El carrito está vacío. ¡Añade algunos productos!</p>
      </div>
    )
  }

  return (
    // Contenedor principal del display del carrito con estilos de Bootstrap
    <div className="bg-white rounded shadow-sm p-4">
      <h2 className="h4 fw-bold mb-4">Tu Carrito ({getTotalItems()} items)</h2> {/* Título del carrito */}
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} /> // Renderiza cada ítem del carrito usando el componente CartItem
      ))}
      <div className="mt-4 d-flex justify-content-end"> {/* Contenedor para el botón de vaciar carrito */}
        <button
          onClick={clearCart} // Llama a la función para vaciar el carrito
          className="btn btn-danger" // Estilos de botón de Bootstrap
        >
          Vaciar Carrito
        </button>
      </div>
    </div>
  )
}

export default CartDisplay