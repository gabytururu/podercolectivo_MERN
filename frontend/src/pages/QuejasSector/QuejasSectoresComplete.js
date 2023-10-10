import SumQuejasSector from "../../components/QuejasFormats/SumQuejasSector";
import useQuejasByCategory from "../../Hooks/useQuejasByCategory";
import {Link, useLocation} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import { QuejasContext } from "../../Context/QuejasContext";
//import BarChart from "../../components/BarChart";
import BarChart from "../../components/BarChart/BarChart";

const QuejasSectoresComplete = () => {
    
    //useLocation NO SIRVE AQUI PORQUE NO HAY UNA LOCATION PREVIA QUE ENVIE LAS PROPS O EL STATE A MODO DE LINK como ocurre con los clicks internos en pantalla.... determinar si hace sentido seguir con el useLocation en los links internos o si en realidad TODO debe resolverse montando alguna suerte de CONTEXTO QUE SE TRANSFIERA EN TODOS LOS COMPONENTES 
    // const location = useLocation()
    // const [quejas, setQuejas] = useState(location.state.quejas)
    // const [categoryBySector, setCategoryBySector] = useState(location.state.categoryBySector)
    // console.log("location --->", location)
    // console.log("las quejas--->", quejas)
    // console.log("las categoriesbySector--->", categoryBySector

    const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany,barChartColor, barChartRadius} = useContext(QuejasContext)


    useEffect(()=>{
        const fetchQuejas = async()=>{
            try{
                const quejasObject = await fetch('http://localhost:5000/api/quejas-profeco/')
                const quejasJson = await quejasObject.json()
    
                if(quejasObject.ok){
                    setQuejas(quejasJson)
                    const quejasSector = sumQuejasPerCategory(quejasJson, categorySector) 
                    setQuejasPerSector(quejasSector)
                    setGraphPerSector({
                        labels: quejasSector.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=>quejas.company),
                        datasets: [{
                            label: 'Quejas por Sector',
                            data: quejasSector.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=> quejas.totalQuejas),
                            backgroundColor: barChartColor,
                            borderRadius: barChartRadius
                       }]})
                    
 
                }
            }catch(err){
                console.log('hubo un error: ', err)
            }         
        }
        fetchQuejas()        
      
    },[])

    
    return ( 
        <div className="containerWrap" style={{ whiteSpace: 'pre-line' }}>
            <div className="data"> 
                <h1 className="datah1">
                    Sectores con más Quejas Acumuladas ante PROFECO México
                </h1>
                <p className="dataP">La gráfica siguiente presenta la lista de los 50 sectores con más quejas interpuestas ante la PROFECO México, durante el período 2022 y lo que va de 2023*</p>
                    <BarChart chartData={graphPerSector}/>                                         
                <h2 className="datah2">Lista detallada de los Sectores con más quejas presentadas ante PROFECO México</h2>                
                <p className="dataP">Puedes dar click o tap a cada una para conocer detalles de las empresas con quejas que forman parte de este sector</p>
                  {/* OJO AQUI-- intente key con i, queja.i, queja._id, pero TODAS arrojan el error de Warning: Each child in a list should have a unique "key" prop en HOME, QUEJASCOMPANIESCOMPLETE Y QUEJASSECTORESCOMPLETE  */}
                {quejasPerSector
                        .sort((a,b)=>b.totalQuejas - a.totalQuejas)
                        .map((queja,i)=>(
                            <Link to={'/sector/'+ queja.sectorParamUrl}><SumQuejasSector key={i} queja={queja}/></Link>
                        ))
                    }
            
            </div>
        </div>
     );
}
 
export default QuejasSectoresComplete;