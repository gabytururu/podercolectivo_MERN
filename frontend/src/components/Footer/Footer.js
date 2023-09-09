import './Footer.css'
import {Link} from 'react-router-dom'

const Footer = () => {
    return ( 
        <footer className="footerWrapper">
                <div className="footLogo">
                    <img src="./poderColectivoLOGO_BL_CLEAR.png" alt="logotipo poder colectivo" />
                </div>
                <div className="footLegend">
                    <p>Un sitio hecho con <span>H</span> de Mexas para Mexas</p>
                </div>
                <div className="navFooter">
                    <Link>Inicio</Link>
                    <Link>Quienes Somos</Link>
                    <Link>Contacto</Link>
                    <Link>Aviso de Privacidad</Link>
                </div>
                <div className="footClosure">
                    <p>PoderColectivo© 2023 - Todos los Derechos Reserados</p>
                </div>     
        </footer>
     );
}
 
export default Footer;