import SumQuejasSector from "../../components/QuejasFormats/SumQuejasSector";
import useQuejasByCategory from "../../Hooks/useQuejasByCategory";
import {Link, useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'

const QuejasSectoresComplete = () => {
    //fyi siguiendo / COPIANDO el mismo metodo que QUEJASCOMPANIESCOMPLETE --- pero OJO no es lo mas efectivo pq estoy fetcheando over and over solo con useEffect... el siguiente paso sera ver si logro resolver el issue de que useFetch COMPITE con useQuejasbyCategory Y NO Renderiza bien .... o determinar si es correcto que el fetch ocurra en el context y se pase como contexto al resto de componentes o algo asi?? / QUIZA SI VUELVO USEQUEJASBYCATEGORY ASINCRONA??
    
    //useLocation NO SIRVE AQUI PORQUE NO HAY UNA LOCATION PREVIA QUE ENVIE LAS PROPS O EL STATE A MODO DE LINK como ocurre con los clicks internos en pantalla.... determinar si hace sentido seguir con el useLocation en los links internos o si en realidad TODO debe resolverse montando alguna suerte de CONTEXTO QUE SE TRANSFIERA EN TODOS LOS COMPONENTES 
    // const location = useLocation()
    // const [quejas, setQuejas] = useState(location.state.quejas)
    // const [categoryBySector, setCategoryBySector] = useState(location.state.categoryBySector)
    // console.log("location --->", location)
    // console.log("las quejas--->", quejas)
    // console.log("las categoriesbySector--->", categoryBySector)

    const [quejas,setQuejas] = useState(null)
    const [categoryBySector, setCategoryBySector] = useState('sector')
    useEffect(()=>{
        const fetchQuejas = async()=>{
            try{
                const quejasObject = await fetch('http://localhost:5000/api/quejas/')
                const quejasJson = await quejasObject.json()
    
                if(quejasObject.ok){
                    setQuejas(quejasJson)
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