import SumQuejasSector from "../../components/QuejasFormats/SumQuejasSector";
import useQuejasByCategory from "../../Hooks/useQuejasByCategory";
import {Link, useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'

const QuejasSectoresComplete = () => {
    
    const location = useLocation()
    const [quejas, setQuejas] = useState(location.state.quejas)
    const [categoryBySector, setCategoryBySector] = useState(location.state.categoryBySector)
    
    

    console.log("location --->", location)
    console.log("las quejas--->", quejas)
    console.log("las categoriesbySector--->", categoryBySector)
    const quejasAggregatedBySector = useQuejasByCategory(quejas,categoryBySector)
    return ( 
        <div className="containerWrap">
            <h1 >
                Aca va la lista ampliada de lAS QUEJAS ACUMULADAS POR SECTORES             
            </h1>
            <div className="data"> 
                <h2>¿Cuáles son los Sectores con más Quejas en México?</h2> 

                <h2>va la  data</h2>
                {quejas && categoryBySector && quejasAggregatedBySector && quejasAggregatedBySector.map((queja)=>(
                            <Link to={'/sector/'+ queja.sector}><SumQuejasSector key={queja._id} queja={queja}/></Link>
                        ))
                    }
            
            </div>
        </div>
     );
}
 
export default QuejasSectoresComplete;