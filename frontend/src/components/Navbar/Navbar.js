import {Link, NavLink} from 'react-router-dom'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react'

const Navbar = () => {

    const [openNavBar, setOpenNavbar] = useState(true)

    return ( 
       
            <header className="navbar">
                <nav>
                    <div className="logo">
                        <Link to="/">
                            <img src="./podercolectivoLOGO_BL_CLEAR.png" alt="poder coletivo logo"/>
                        </Link>
                    </div>
                    <div className="menu">
                        <NavLink exact activeClassName= "active" o="/">Inicio</NavLink>
                        <NavLink activeClassName= "active" to="/sectores">Quejas por Sector</NavLink>
                        <NavLink activeClassName= "active" to="/empresas">Quejas por Empresa</NavLink>
                        <NavLink activeClassName= "active" to="/poner-queja">Poner una Queja</NavLink>
                    </div>

                    {/* NOT WORKING BC NOW I NEED TO SET THE OPOSITE FOR CLOSE NAVBAR OR SOMETHING SIMILAR TO TOGGLE --- CHECK HOW TO DO TAHT ALSO FINISH PEDROTECH TUTORIAL BC I NEED TO ALSO RENDER THE MENU AS IT SHOWS UP*/}
                    {/* ALSO... MUST CHECK AGAIN WHAT TO DO WITH FONTAWESOME BC IT IS NOW IMPORTIN ALL LIBRARY OF SVGS SO IT TRIES TO UPLOAD ON GITHUB :( SIMILAR TO THE NODEMODULES THING ya entendi porque... ES PORQUE INSTALE TODO EN PODER COLECTIVO Y DEBIO SER EN FRONTEND ---!! DESINSTALAR TODO, VA PA TRAS Y VOLVER A ESTABLECER LOS ICONOS DESDE CD/FRONTEND Y BORRAR LAS CARPETAS DE NODEMODULES Y PACKAGE JSON NUEVOS*/}
                    <div className="mobile" onClick={()=>{setOpenNavbar(false)}}>
                    { openNavBar ? 
                        <FontAwesomeIcon icon={faBars} className="icon open" />
                        :
                        <FontAwesomeIcon icon={faX} className="icon close"/>
                    }
                    </div>

                </nav>
            </header>
        

        

     );
}
 
export default Navbar;