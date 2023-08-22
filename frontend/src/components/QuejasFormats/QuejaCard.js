import './QuejaCard.css'
import {Link} from 'react-router-dom'

const QuejaCard = ({queja}) => {
     // const id = queja._id
     // const nombre = queja.nombreComercial
     // const {_id, nombre_comercial, sector} = queja
     const {_id, nombreComercial, sector, giro, fecha_ingreso, estado_procesal, motivo_reclamacion, costo_bien_servicio, monto_reclamado, monto_recuperado_b,id_exp } = queja

    return ( 
          <div className="quejaContainer">
               {/* <Link to={'/sector/'+industria||sector}>                    */}
                    {queja && 
                         <div className="queja">
                              {/* <p>Nombre {nombre_comercial}</p> */}
                              <h3 id="quejaCardTitle">Queja Emitida a "{nombreComercial}"</h3>
                              {/* <p>Sector {sector}</p> */}
                              <p><b>Giro de la Empresa:</b> {giro}</p>
                              <p><b>Motivo de la Queja:</b> {motivo_reclamacion}</p>
                              <p><b>Costo del Bien o Servicio Reclamado:</b> ${costo_bien_servicio} MXN</p>
                              {/* no sale la fecha de ingreso POR? */}
                              {/* <p>Fecha Ingreso {fecha_ingreso}</p> */}
                              <p><b>Estado Procesal: </b>{estado_procesal}</p>
                              {/* <p>Monto Reclamado {monto_reclamado}</p>
                              <p>Monto Recuperado {monto_recuperado_b}</p>                              */}
                              <p id="quejaId"><small>*Id de queja ante PROFECO: {id_exp}*</small></p>
                         </div>
                    }                        
               {/* </Link> */}
          </div>
     );
}
 
export default QuejaCard;