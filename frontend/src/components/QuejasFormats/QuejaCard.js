import './QuejaCard.css'
import {Link} from 'react-router-dom'

const QuejaCard = ({queja}) => {
     const {_id, nombreComercial, nombreComercialCorto, sector, giro, fecha_ingreso, estado_procesal, tipo_reclamacion_causaCorta, motivo_reclamacion_causaLarga, costo_bien_servicio, monto_reclamado, monto_recuperado_b,id_exp } = queja

    return ( 
          <div className="quejaContainer">
               {queja && 
                    <div className="queja">
                         <h3 id="quejaDetailedCardTitle">Queja de "{nombreComercialCorto}" con Id#{id_exp} </h3>
                         <hr />
                         <div className='quejasParagraphs'>
                              <p><b>Tipo de Reclamo & Motivo de la Queja:</b> {tipo_reclamacion_causaCorta} & {motivo_reclamacion_causaLarga}</p>
                              <p><b>Costo del Bien o Servicio Reclamado:</b> {costo_bien_servicio.toLocaleString("es-MX", {style:"currency", currency:"MXN", minimumFractionDigits: 0, maximumFractionDigits: 0,})
                              }   MXN</p>
                              <p><b>Estado Procesal: </b>{estado_procesal}</p>
                              <p><b>Razón Social de la Empresa Vinculada:</b>{nombreComercial}</p>
                              <p id="quejaId"><small>*El Id# es el número oficial de seguimeinto de esta queja asignado por PROFECO. En este caso es el:  {id_exp}*</small></p>
                         </div>
                    </div>
               }                        
          </div>
     );
}
 
export default QuejaCard;