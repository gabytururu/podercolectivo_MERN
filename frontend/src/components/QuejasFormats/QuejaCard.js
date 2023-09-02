import './QuejaCard.css'
import {Link} from 'react-router-dom'

const QuejaCard = ({queja}) => {
     const {_id, nombreComercial, sector, giro, fecha_ingreso, estado_procesal, motivo_reclamacion, costo_bien_servicio, monto_reclamado, monto_recuperado_b,id_exp } = queja

    return ( 
          <div className="quejaContainer">
               {queja && 
                    <div className="queja">
                         <h3 id="quejaDetailedCardTitle">Queja Emitida a "{nombreComercial}"</h3>
                         <hr />
                         <div className='quejasParagraphs'>
                              <p><b>Motivo de la Queja:</b> {motivo_reclamacion}</p>
                              <p><b>Costo del Bien o Servicio Reclamado:</b> ${costo_bien_servicio} MXN</p>
                              <p><b>Estado Procesal: </b>{estado_procesal}</p>
                              <p id="quejaId"><small>*Id de queja ante PROFECO: {id_exp}*</small></p>
                         </div>
                    </div>
               }                        
          </div>
     );
}
 
export default QuejaCard;