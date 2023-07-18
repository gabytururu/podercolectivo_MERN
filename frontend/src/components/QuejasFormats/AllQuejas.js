import './AllQuejas.css'

const AllQuejas = ({queja}) => {

    return ( 
        <div className="quejaContainer">
               <div className="queja">
                    {queja && 
                         <div>
                              <p>Nombre {queja.nombreComercial}</p>
                              <p>Sector {queja.sector || queja.industria}</p>
                              <p>Id {queja._id}</p>
                         </div>
                    }            
               </div>            
        </div>
     );
}
 
export default AllQuejas;