import '../Cart/Cart.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const Cart = () => {

    const { cart, removeItem, total, clearCart } = useContext(CartContext)

    return (
        <div className='cart'>
            <h1>Carrito</h1>
            <article className="CardItem">
            {
                cart.map(prod => (
                    <div className='list'>
                        
                        {prod.name} - cantidad: {prod.quantity}
                        <button className='Button' onClick={() => removeItem(prod.id)}>remover</button>                  
                       
                    </div>
                ))
            }

            <div>
                Precio total: {total}
            </div>

            <button className='Button' onClick={() => clearCart()}>Limpiar carrito</button>
            </article>
        </div>
    
    )
    
}

export default Cart