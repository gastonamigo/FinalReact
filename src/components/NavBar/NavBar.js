import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="NavBar" >
      <NavLink className="Tittle" to='/'>
          <h3>Kaira Printers</h3>
      </NavLink>

        <div className="Categories">
            <NavLink to={'/category/FDM'} className={({ isActive}) => isActive ? 'ActiveOption' : 'Option'}>Impresoras FDM</NavLink>
            <NavLink to={'/category/resina'} className={({ isActive}) => isActive ? 'ActiveOption' : 'Option'}>Impresoras de Resina</NavLink>
        </div>
        <CartWidget />
    </nav>
  )
}

export default NavBar
