import SumQuejasCompany from "../../components/QuejasFormats/SumQuejasCompany";
import SumQuejasSector from "../../components/QuejasFormats/SumQuejasSector";
import useQuejasByCategory from "../../Hooks/useQuejasByCategory";
import {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import useFetch from "../../Hooks/useFetch";

const QuejasCompaniesComplete = () => {

    // //  FUNCIONA OK EL USE FETCH PERO COMPITE CON USEQUEJAS BY CATEGORY QUE NO RECIBE A TIEMPO Y DEVUELVE NULL -- FUNCIONA OK SI LO MANEJO COMO FETCH DIRECTO OCN USE EFFECT // PERO NO PUEDO USAR USEFETCH DENTRO DE USEEFFECT PORQUE QUEDARIA CONDITIONAL/COMO CALLBACK Y ESO NO LO DEJA HACER CON HOOKS // QUIZA SI VUELVO USEQUEJASBYCATEGORY ASINCRONA??
    const [quejas,setQuejas] = useState(null) 
    const [categoryByCompanies, setCategoryByCompanies] = useState('nombreComercial')
    // const quejasB = useFetch('http://localhost:5000/api/quejas/')
    // quejasB && setQuejas(quejasB)
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
   
    const quejasAggregatedByCompanies =  useQuejasByCategory(quejas, categoryByCompanies)

    //quejasB && console.log('las quejas b',quejasB)
    // quejasB ? console.log('las QuejasB ---> ', quejasB) : console.log('no hay quejas B')
    // /---------------------------------------------------------------

    // const location = useLocation()
    // const [quejas, setQuejas] = useState(location.state.quejas)
   
    // // if (location.state === null){
    // //     quejasB && setQuejas(quejasB)
    // // }
    // const [categoryByCompanies, setCategoryByCompanies] = useState(location.state.categoryByCompanies)
    
    
    // // if (quejas === null){
    // //     setQuejas(useFetch('http://localhost:5000/api/quejas/'))
    // // }

    // console.log("location --->", location)
    // console.log("las quejas--->", quejas)
    // console.log("las categoriesbyCompany--->", categoryByCompanies)

    
    
    return ( 
        <div className="containerWrap">
            <h1 >
                Aca va la lista ampliada de lAS QUEJAS ACUMULADAS POR COMPAÑIAS             
            </h1>
            <div className="data"> 
                <h2>¿Cuáles son las Empresas con más Quejas en México?</h2> 

                <h2>va la  data</h2>
                  {/* OJO AQUI-- intente key con i, queja.i, queja._id, pero TODAS arrojan el error de Warning: Each child in a list should have a unique "key" prop en HOME, QUEJASCOMPANIESCOMPLETE Y QUEJASSECTORESCOMPLETE  */}
                {quejas && categoryByCompanies && quejasAggregatedByCompanies && quejasAggregatedByCompanies.map((queja,i)=>(
                            <Link to={'/'+ queja.sector+'/'+ queja.company}><SumQuejasCompany key={i} queja={queja}/></Link>
                        ))
                    }
            
            </div>
        </div>
     );
}
 
export default QuejasCompaniesComplete;