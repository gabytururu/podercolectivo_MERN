import SumQuejasSector from "../../components/QuejasFormats/SumQuejasSector";
import useQuejasByCategory from "../../Hooks/useQuejasByCategory";
import {Link, useLocation} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import { QuejasContext } from "../../Context/QuejasContext";
import BarChart from "../../components/BarChart";

const QuejasSectoresComplete = () => {
    //fyi siguiendo / COPIANDO el mismo metodo que QUEJASCOMPANIESCOMPLETE --- pero OJO no es lo mas efectivo pq estoy fetcheando over and over solo con useEffect... el siguiente paso sera ver si logro resolver el issue de que useFetch COMPITE con useQuejasbyCategory Y NO Renderiza bien .... o determinar si es correcto que el fetch ocurra en el context y se pase como contexto al resto de componentes o algo asi?? / QUIZA SI VUELVO USEQUEJASBYCATEGORY ASINCRONA??
    
    //useLocation NO SIRVE AQUI PORQUE NO HAY UNA LOCATION PREVIA QUE ENVIE LAS PROPS O EL STATE A MODO DE LINK como ocurre con los clicks internos en pantalla.... determinar si hace sentido seguir con el useLocation en los links internos o si en realidad TODO debe resolverse montando alguna suerte de CONTEXTO QUE SE TRANSFIERA EN TODOS LOS COMPONENTES 
    // const location = useLocation()
    // const [quejas, setQuejas] = useState(location.state.quejas)
    // const [categoryBySector, setCategoryBySector] = useState(location.state.categoryBySector)
    // console.log("location --->", location)
    // console.log("las quejas--->", quejas)
    // console.log("las categoriesbySector--->", categoryBySector)

    const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany} = useContext(QuejasContext)

    //const [quejas,setQuejas] = useState(null)
    const [categoryBySector, setCategoryBySector] = useState('sector')

    useEffect(()=>{
        const fetchQuejas = async()=>{
            try{
                const quejasObject = await fetch('http://localhost:5000/api/quejas/')
                const quejasJson = await quejasObject.json()
    
                if(quejasObject.ok){
                    setQuejas(quejasJson)
                    const quejasSector = sumQuejasPerCategory(quejasJson, categorySector) //<-- not working if i use "quejas" instead of quejas Json
                    // setQuejasPerSector(quejasSector) //<-- not working if i use state for the labels: map... quejasPerSector (state) not working, must use var
                    const quejasDataSector ={
                        labels: quejasSector.map((quejas)=>quejas.company),
                        datasets: [{
                            label: 'Quejas por Sector',
                            data: quejasSector.map((quejas)=> quejas.totalQuejas),
                            backgroundColor: [
                                '#1ac8ed', //blue
                                // '#1ac6edb0',
                                // '#005494',
                                // '#ff6347',
                                // '#ffba08',
                            ],
                            borderColor:'#000000',
                            borderWidth:2
                       }]}
                    setGraphPerSector(quejasDataSector)
                }
            }catch(err){
                console.log('hubo un error: ', err)
            }         
        }
        fetchQuejas()        
      
    },[])

    const quejasAggregatedBySector = useQuejasByCategory(quejas,categoryBySector)
    return ( 
        <div className="containerWrap">
            <h1 >
                Aca va la lista ampliada de lAS QUEJAS ACUMULADAS POR SECTORES             
            </h1>
            <div className="barChart">  
                    <BarChart chartData={graphPerSector}/>                                            
            </div>
            <div className="data"> 
                <h2>¿Cuáles son los Sectores con más Quejas en México?</h2> 

                <h2>va la  data</h2>
                  {/* OJO AQUI-- intente key con i, queja.i, queja._id, pero TODAS arrojan el error de Warning: Each child in a list should have a unique "key" prop en HOME, QUEJASCOMPANIESCOMPLETE Y QUEJASSECTORESCOMPLETE  */}
                {quejas && categoryBySector && quejasAggregatedBySector && quejasAggregatedBySector.map((queja,i)=>(
                            <Link to={'/sector/'+ queja.sector}><SumQuejasSector key={i} queja={queja}/></Link>
                        ))
                    }
            
            </div>
        </div>
     );
}
 
export default QuejasSectoresComplete;