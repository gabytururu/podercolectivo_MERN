import './QuejaCard.css'
import {Link} from 'react-router-dom'

const QuejaCard = ({queja}) => {
     // const id = queja._id
     // const nombre = queja.nombreComercial
     // const {_id, nombre_comercial, sector} = queja
     const {_id, nombreComercial, sector, giro, fecha_ingreso, estado_procesal, motivo_reclamacion, costo_bien_servicio, monto_reclamado, monto_recuperado_b} = queja

    return ( 
          <div className="quejaContainer">
               {/* <Link to={'/sector/'+industria||sector}>                    */}
                    {queja && 
                         <div className="queja">
                              {/* <p>Nombre {nombre_comercial}</p> */}
                              <p>{nombreComercial}</p>
                              <p>Sector {sector}</p>
                              <p>Giro {giro}</p>
                              <p>Fecha Ingreso {fecha_ingreso}</p>
                              <p>Estado Procesal {estado_procesal}</p>
                              <p>Motivo {motivo_reclamacion}</p>
                              <p>Costo del Bien o Servicio Reclamado {costo_bien_servicio}</p>
                              <p>Monto Reclamado {monto_reclamado}</p>
                              <p>Monto Recuperado {monto_recuperado_b}</p>                             
                              <p><small>Id {_id}</small></p>
                         </div>
                    }                        
               {/* </Link> */}
          </div>
     );
}
 
export default QuejaCard;