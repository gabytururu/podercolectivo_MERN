import './AllQuejas.css'
import {Link} from 'react-router-dom'

const AllQuejas = ({queja}) => {
     // const id = queja._id
     // const nombre = queja.nombreComercial
     const {_id, nombre_comercial, sector} = queja

    return ( 
          <div className="quejaContainer">
               {/* <Link to={'/sector/'+industria||sector}>                    */}
                    {queja && 
                         <div className="queja">
                              <p>Nombre {nombre_comercial}</p>
                              <p>Sector {sector}</p>
                              <p>Id {_id}</p>
                         </div>
                    }                        
               {/* </Link> */}
          </div>
     );
}
 
export default AllQuejas;