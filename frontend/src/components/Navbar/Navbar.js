import {Link, NavLink} from 'react-router-dom'
import './Navbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faX} from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react'

const Navbar = () => {

    const [openNavBar, setOpenNavbar] = useState(true)
    
    // substituted by function ((curr) => !curr en el onclick)
    // const checkOpenNavBar = (openNavBar) =>{
    //     if(openNavBar === false){
    //         setOpenNavbar(true)
    //     }else{
    //         setOpenNavbar(false)
    //     }
    // }

    
  
    return ( 
       
            <header className="navbar">
                <nav>
                    <div className="logo">
                        {/* <img src="./podercolectivoLOGO_BL_CLEAR.png" alt="poder coletivo logo" /> */}
                        <Link to="/">
                            {/* <img src="./podercolectivoLOGO_BL_CLEAR.png" alt="poder coletivo logo" onError={(e)=>{console.error('Error loading logo:', e.message)}}/> */}
                            <img src="/podercolectivoLOGO_BL_CLEAR.png" alt="poder coletivo logo" />
                        </Link>
                    </div>
                    <div className="menu">
                        <NavLink exact activeClassName= "active" to="/">Inicio</NavLink>
                        <NavLink activeClassName= "active" to="/sectores">Quejas por Sector</NavLink>
                        <NavLink activeClassName= "active" to="/empresas">Quejas por Empresa</NavLink>
                        <NavLink activeClassName= "active" to="/giro">Quejas por Giro</NavLink>
                        <NavLink activeClassName= "active" to="/poner-queja">Poner una Queja</NavLink>
                    </div>

                    {/* <div className="mobile" onClick={()=>{checkOpenNavBar(openNavBar)}}> */}
                    <div className="mobile" onClick={()=>{setOpenNavbar(curr=>!curr)}}>
                        { openNavBar ?                             
                                <FontAwesomeIcon icon={faBars} className="icon" />
                                :
                                <FontAwesomeIcon icon={faX} className="icon"/>
                        }
                    </div>

                    <div className="overlayBox" >
                        {openNavBar ?!
                            ''
                        :                            
                            <div className="menuOverlay">
                                <NavLink exact activeClassName= "active" to="/" onClick={()=>{setOpenNavbar(curr=>!curr)}}>Inicio</NavLink>
                                <NavLink activeClassName= "active" to="/sectores" onClick={()=>{setOpenNavbar(curr=>!curr)}}>Quejas por Sector</NavLink>
                                <NavLink activeClassName= "active" to="/empresas" onClick={()=>{setOpenNavbar(curr=>!curr)}}>Quejas por Empresa</NavLink>
                                <NavLink activeClassName= "active" to="/giro" onClick={()=>{setOpenNavbar(curr=>!curr)}}>Quejas por Giro</NavLink>
                                <NavLink activeClassName= "active" to="/poner-queja" onClick={()=>{setOpenNavbar(curr=>!curr)}}>Poner una Queja</NavLink>
                            </div>       
                        }
                    </div>

                   

                </nav>
            </header>
        

        

     );
}
 
export default Navbar;