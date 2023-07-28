import SumQuejasSector from "../../components/QuejasFormats/SumQuejasSector";
import {Link, useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'

const QuejasSectoresComplete = () => {
    
    const location = useLocation()
    const data= location.state
    console.log("location --->", location)
    // console.log(location.message)
    // console.log(location.state.message)
    console.log("data -->",data)

    return ( 
        <div className="containerWrap">
            <h1 >
                Aca va la lista ampliada de lAS QUEJAS ACUMULADAS POR SECTORES             
            </h1>
            <div className="data"> 
                <h2>¿Cuáles son los Sectores con más Quejas en México?</h2> 

                <h2>va la  data</h2>
                {/* {quejas && createQuejasByCategory(quejas, categoryBySector).map((queja)=>(
                            <Link to={'/sector/'+ queja.sector}><SumQuejasSector key={queja._id} queja={queja}/></Link>
                        ))
                    } */}
            
            </div>
        </div>
     );
}
 
export default QuejasSectoresComplete;