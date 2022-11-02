import './Item.css'
import { Link } from 'react-router-dom'

const Item = ({id, name, img, price }) => {

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
                    Precio: ${price}
                </p>
            </section>           
            <footer className='ItemFooter'>
               <Link className="ButtonDetail" to={`/detail/${id}`}>Ver detalle</Link>
            </footer>
        </div>
    )
}

export default Item

