import './AllQuejas.css'
import {Link} from 'react-router-dom'
import {useParams} from 'react'


const AllQuejas = ({queja}) => {

     // const id = queja._id
     // const nombre = queja.nombreComercial
     const {_id, nombreComercial, sector, industria} = queja

    return ( 
          <div className="quejaContainer">
               <Link to={'/sector/'+industria||sector}>
               <div className ="queja">
                         {queja && 
                              <div>
                                   <p>Nombre {nombreComercial}</p>
                                   <p>Sector {sector || industria}</p>
                                   <p>Id {_id}</p>
                              </div>
                         }     
                    </div>
               </Link>
          </div>
     );
}
 
export default AllQuejas;