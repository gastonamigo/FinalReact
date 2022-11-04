import '../Cart/Cart.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'

const Cart = () => {

    const { cart, removeItem, total, clearCart } = useContext(CartContext)

    if (cart.length === 0){
        return (
            <div className='cart'>
            <div className='CardItem'>
              <h4>No hay productos en el carrito</h4>
              <Link to="/" className="Button">Volver al catálogo</Link>
            </div>
            </div>
          ) 
    }else{

    return (
        <div className='cart'>
            <h1 className='titulo'>Carrito</h1>
            <div className="CardItem">
           
            <h2 className='titulo'>Productos</h2>
            
            {
                
                cart.map(prod => (
                    
                    <div className='list'>
                        <h5 className='cartList'>{prod.name} - cantidad: {prod.quantity}</h5>
                        <button className='removeButton' onClick={() => removeItem(prod.id)}>Quitar</button>                  
                       
                    </div>
                ))
            }

            <div className='total'>
                Precio total: ${total}.-
            </div>

            <button className='Button' onClick={() => clearCart()}>Limpiar carrito</button>
            <Link className='Button' to='/checkout' >Finalizar Compra</Link>
            </div>
        </div>
    
    )
        }
    
}

export default Cart