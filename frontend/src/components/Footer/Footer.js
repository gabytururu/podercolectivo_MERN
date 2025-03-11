import './Footer.css'
import {Link} from 'react-router-dom'

const Footer = () => {
    return ( 
        <footer className="footerWrapper">
            <div className="footerInfo">
                <div className="footLogo">
                    <img src="/poderColectivoLOGO_BL_CLEAR.png" alt="logotipo poder colectivo" />
                </div>
                <div className="footLegend">
                    <p>Hecho con <span>❤️</span> de Mexas para Mexas</p>
                    <p>by @soulboundavatar</p>
                    
                </div>
                <div className="navFooter">
                    <Link>Inicio</Link>
                    <Link>Quienes Somos</Link>
                    <Link>Contacto</Link>
                    <Link>Aviso de Privacidad</Link>
                </div>
            </div>
            <div className="footerCopyRights">
                <div className="footClosure">
                    <hr className="footline"></hr>
                    <p>PoderColectivo© 2023 - Todos los Derechos Reservados</p>
                </div>   
            </div>  
        </footer>
     );
}
 
export default Footer;