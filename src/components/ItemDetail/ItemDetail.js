import './ItemDetail.css'
import Counter from '../Counter/Counter'
import { useContext } from 'react'
import {  useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
   
    const { addItem, getProductQuantity } = useContext(CartContext)
    
    const [goToCart, setGoToCart] = useState (false)
    



    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id,
            img,
            name,
            category,
            price,
            description
        }
        setGoToCart(true);
        addItem(productToAdd, quantity)
                
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se agrego al carrito ${quantity} ${name}`,
            showConfirmButton: false,
            timer: 1500
                                                
        })
       
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
            { stock!==0 ? <Counter onAdd={handleOnAdd} stock={stock} initial={quantityAdded} /> : <h4 className='tagStock'>Producto<br/>Sin Stock</h4> }
        { !goToCart ? true :
        <div className="buttonsDetail">
        <Link to='/cart' className="Button">Ir al carrito</Link>
        <Link to='/' className="Button">Seguir comprando</Link> 
        </div> }
        { goToCart ? true
        : 
        <div>
            <Link to='/' className="Button">Volver al listado</Link> 
                </div>
                }
            </footer>
        </div>
    )
}

export default ItemDetail