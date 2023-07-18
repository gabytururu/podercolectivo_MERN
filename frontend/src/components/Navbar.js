import {Link} from 'react-router-dom'

const Navbar = () => {
    return ( 
        <header>
            <nav className="navbar">
                <Link to="/">Inicio</Link>
                <Link to="/sector/:sector">Quejas por Sector</Link>
                <Link to="/:sector/:nombreComercial">Quejas por Empresa</Link>
                <Link to="/poner-queja">Poner una Queja</Link>
            </nav>
        </header>

     );
}
 
export default Navbar;