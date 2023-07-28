import SumQuejasSector from "../../components/QuejasFormats/SumQuejasSector";
import {Link} from 'react-router-dom'

const QuejasSectoresComplete = ({quejas, createQuejasByCategory, categoryBySector}) => {
    
    quejas && console.log(quejas)
    return ( 
        <div className="containerWrap">
            <h1 >
                Aca va la lista ampliada de lAS QUEJAS ACUMULADAS POR SECTORES             
            </h1>
            <div className="data"> 
                <h2>¿Cuáles son los Sectores con más Quejas en México?</h2> 
                {quejas && createQuejasByCategory(quejas, categoryBySector).map((queja)=>(
                            <Link to={'/sector/'+ queja.sector}><SumQuejasSector key={queja._id} queja={queja}/></Link>
                        ))
                    }
            
            </div>
        </div>
     );
}
 
export default QuejasSectoresComplete;