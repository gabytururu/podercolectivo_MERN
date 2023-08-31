import SumQuejasSector from "../../components/QuejasFormats/SumQuejasSector";
import useQuejasByCategory from "../../Hooks/useQuejasByCategory";
import {Link, useLocation} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import { QuejasContext } from "../../Context/QuejasContext";
import BarChart from "../../components/BarChart";

const QuejasSectoresComplete = () => {
    
    //useLocation NO SIRVE AQUI PORQUE NO HAY UNA LOCATION PREVIA QUE ENVIE LAS PROPS O EL STATE A MODO DE LINK como ocurre con los clicks internos en pantalla.... determinar si hace sentido seguir con el useLocation en los links internos o si en realidad TODO debe resolverse montando alguna suerte de CONTEXTO QUE SE TRANSFIERA EN TODOS LOS COMPONENTES 
    // const location = useLocation()
    // const [quejas, setQuejas] = useState(location.state.quejas)
    // const [categoryBySector, setCategoryBySector] = useState(location.state.categoryBySector)
    // console.log("location --->", location)
    // console.log("las quejas--->", quejas)
    // console.log("las categoriesbySector--->", categoryBySector

    const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany} = useContext(QuejasContext)

    //const [quejas,setQuejas] = useState(null)
    // const [categoryBySector, setCategoryBySector] = useState('sector')
    // const quejasAggregatedBySector = useQuejasByCategory(quejas,categoryBySector)

    useEffect(()=>{
        const fetchQuejas = async()=>{
            try{
                const quejasObject = await fetch('http://localhost:5000/api/quejas/')
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
                            backgroundColor: [
                                '#1ac8ed', //blue
                                // '#1ac6edb0',
                                // '#005494',
                                // '#ff6347',
                                // '#ffba08',
                            ],
                            borderColor:'#000000',
                            // borderWidth:2,
                            borderRadius: 8
                       }]})
                    
 
                }
            }catch(err){
                console.log('hubo un error: ', err)
            }         
        }
        fetchQuejas()        
      
    },[])

    
    return ( 
        <div className="containerWrap">
            <h1 >
                Quejas Recibidas Por Sector Comercial            
            </h1>
            <div className="barChart">  
                    <BarChart chartData={graphPerSector}/>                                            
            </div>
            <div className="data"> 
                <h2>¿Cuáles son los Sectores con más Quejas en México?</h2>
                  {/* OJO AQUI-- intente key con i, queja.i, queja._id, pero TODAS arrojan el error de Warning: Each child in a list should have a unique "key" prop en HOME, QUEJASCOMPANIESCOMPLETE Y QUEJASSECTORESCOMPLETE  */}
                {quejasPerSector
                        .sort((a,b)=>b.totalQuejas - a.totalQuejas)
                        .map((queja,i)=>(
                            <Link to={'/sector/'+ queja.sector}><SumQuejasSector key={i} queja={queja}/></Link>
                        ))
                    }
            
            </div>
        </div>
     );
}
 
export default QuejasSectoresComplete;