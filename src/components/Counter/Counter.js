import './Counter.css'
import { useState } from 'react'


const Counter = ({ stock = 0, initial = 1, onAdd }) => {
    const [quantity, setQuantity] = useState(initial)

    const increment = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1)
        }
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    
    return (
        <div className='Counter'>
              
                {quantity > 0 ?
                    <div className='Controls'>
                    <button className="Button" onClick={decrement}>-</button>
                    <h4 className='Number'>{quantity}</h4>
                    <button className="Button" onClick={increment}>+</button>
                    <div>

                    <button className="Button" onClick={() => onAdd(quantity)}>
                        Agregar al carrito
                    </button>
                    </div>
                </div>
                    :
                    <div className='Controls'>
            <button className="Button">-</button>
            <h4 className='Number'>0</h4>
            <button className="Button">+</button>
            <h3>NO HAY STOCK</h3>
        </div>
                }
           
        </div>
    )

}
export default Counter