// --- src/components/CartItem.jsx ---
import React, { useContext } from 'react'; // Importa React y useContext
import { PlusCircle, MinusCircle, Trash2 } from 'lucide-react'; // Importa los iconos de Lucide React
import { CartContext } from '../context/CartContext'; // Importa el contexto del carrito

const CartItem = ({ item }) => {
  // Obtiene las funciones addToCart, removeFromCart y removeItemFully del contexto del carrito
  const { addToCart, removeFromCart, removeItemFully } = useContext(CartContext);

  return (
    // Contenedor principal del ítem del carrito con estilos de Bootstrap
    <div className="d-flex align-items-center justify-content-between border-bottom py-3">
      <div className="d-flex align-items-center">
        {/* Imagen del producto */}
        <img
          src={item.image?.url || `https://placehold.co/60x60/ADD8E6/000000?text=${item.name}`}
          alt={item.name}
          className="rounded-circle me-3" // Clases de Bootstrap para imagen redonda y margen
          style={{ width: '60px', height: '60px', objectFit: 'cover' }} // Estilos inline para tamaño y ajuste
        />
        <div>
          {/* Nombre y cantidad del producto */}
          <h4 className="h6 fw-semibold mb-0">{item.name}</h4>
          <p className="text-muted mb-0">Cantidad: {item.quantity}</p>
        </div>
      </div>
      <div className="d-flex align-items-center">
        {/* Botón para disminuir la cantidad (llama a removeFromCart) */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="btn btn-sm btn-outline-danger me-2 rounded-circle" // Estilos de botón de Bootstrap
        >
          <MinusCircle size={16} /> {/* Icono de Lucide React */}
        </button>
        {/* Botón para aumentar la cantidad (llama a addToCart) */}
        <button
          onClick={() => addToCart(item)}
          className="btn btn-sm btn-outline-success me-2 rounded-circle" // Estilos de botón de Bootstrap
        >
          <PlusCircle size={16} /> {/* Icono de Lucide React */}
        </button>
        {/* Botón para eliminar completamente el producto (llama a removeItemFully) */}
        <button
          onClick={() => removeItemFully(item.id)}
          className="btn btn-sm btn-outline-secondary rounded-circle" // Estilos de botón de Bootstrap
        >
          <Trash2 size={16} /> {/* Icono de Lucide React */}
        </button>
      </div>
    </div>
  );
};

export default CartItem;