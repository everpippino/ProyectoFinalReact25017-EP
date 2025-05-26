import { useContext } from 'react'
import { PlusCircle, MinusCircle, Trash2 } from 'lucide-react'
import { CartContext } from '../context/CartContext'

const CartItem = ({ item }) => { 
  const { addToCart, removeFromCart, removeItemFully } = useContext(CartContext);

  return (    
    <div className="d-flex align-items-center justify-content-between border-bottom py-3">
      <div className="d-flex align-items-center">
        {/* Imagen del producto */}
        <img
          src={item.image?.url || `https://placehold.co/60x60/ADD8E6/000000?text=${item.name}`}
          alt={item.name}
          className="rounded-circle me-3" 
          style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
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
          className="btn btn-sm btn-outline-danger me-2 rounded-circle"
        >
          <MinusCircle size={16} /> 
        </button>
        {/* Botón para aumentar la cantidad (llama a addToCart) */}
        <button
          onClick={() => addToCart(item)}
          className="btn btn-sm btn-outline-success me-2 rounded-circle"
        >
          <PlusCircle size={16} /> 
        </button>
        {/* Botón para eliminar completamente el producto (llama a removeItemFully) */}
        <button
          onClick={() => removeItemFully(item.id)}
          className="btn btn-sm btn-outline-secondary rounded-circle"
        >
          <Trash2 size={16} /> 
        </button>
      </div>
    </div>
  )
}

export default CartItem