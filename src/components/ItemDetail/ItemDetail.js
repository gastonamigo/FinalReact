import './ItemDetail.css'
import Counter from '../Counter/Counter'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
// import { NotificationContext } from '../../notification/NotificationService'

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
   
    const { addItem, isInCart, getProductQuantity } = useContext(CartContext)
    // const { setNotification } = useContext(NotificationContext)

    const handleOnAdd = (quantity) => {

        const productToAdd = {
            id,
            name,
            price
        }

        addItem(productToAdd, quantity)
        // setNotification('error', `Se agrego correctamente ${quantity} ${name}`)
    }

    const quantityAdded = getProductQuantity(id)

    return (
        <div className="CardItem">
            <header className="Header">
                <h2 className="ItemHeader">
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} className="ItemImg"/>
            </picture>
            <section>
                <p className="Info">
                    Categoria: {category}
                </p>
                <p className="Info">
                    Descripción: {description}
                </p>
                <p className="Info">
                    Precio: {price}
                </p>
            </section>           
            <footer className='ItemFooter'>
                {
                    !isInCart(id) 
                        ? 
                        <Counter onAdd={handleOnAdd} stock={stock} initial={quantityAdded} />
                        : <Link to='/cart' className='Button'>Proceder con la compra</Link>
                }
                
            </footer>
        </div>
    )
}

export default ItemDetail