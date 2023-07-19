import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return ( 
        <div className="headerwrap">
            <header className="navbar">
                <div className="logo">
                    <img src="./podercolectivoLOGO_BL_CLEAR.png" alt="poder coletivo logo"/>
                </div>
                <nav className="menu">
                    <Link to="/">Inicio</Link>
                    <Link to="/sector/:sector">Quejas por Sector</Link>
                    <Link to="/:sector/:nombreComercial">Quejas por Empresa</Link>
                    <Link to="/poner-queja">Poner una Queja</Link>
                </nav>
            </header>
        </div>

        

     );
}
 
export default Navbar;