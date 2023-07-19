import './AllQuejas.css'
import {Link} from 'react-router-dom'

const AllQuejas = ({queja}) => {
     // const id = queja._id
     // const nombre = queja.nombreComercial
     const {_id, nombreComercial, sector, industria} = queja

    return ( 
          <div className="quejaContainer">
               {/* <Link to={'/sector/'+industria||sector}>                    */}
                    {queja && 
                         <div className="queja">
                              <p>Nombre {nombreComercial}</p>
                              <p>Sector {sector || industria}</p>
                              <p>Id {_id}</p>
                         </div>
                    }                        
               {/* </Link> */}
          </div>
     );
}
 
export default AllQuejas;