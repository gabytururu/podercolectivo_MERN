import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'

//import {useFetch} from '../Hooks/useFetch'
import AllQuejas from '../../../src/components/QuejasFormats/AllQuejas'

const QuejasSector = () => {
    const {sector} = useParams()
    const [quejasdelSector, setQuejasdelSector ] = useState(null)

    // const {quejasSector} = useFetch(`http://localhost:5000/api/quejas/sector/${sector}`)

    useEffect(()=>{

        const getQuejasSector = async() =>{
            
            try{
                const fetchQuejasSector = await fetch(`http://localhost:5000/api/quejas/sector/${sector}`)

                const quejasSectorJson = await fetchQuejasSector.json()
                console.log('las queja del jsonObj-->',quejasSectorJson)
                setQuejasdelSector(quejasSectorJson)
                console.log('las quejas del useSTate-->',quejasdelSector)
            }catch(err){
                console.log('el error fue-->',err)
            }
           
        }
        getQuejasSector()  
    },[])
    
    
    return ( 
        <div>
            <h1>ACA IRA EL LAY OUT DE QUEJAS POR SECTOR: {sector}</h1>

            {quejasdelSector && quejasdelSector.map((queja)=>(
                
                <Link to={"/"+sector+"/"+queja.nombreComercial}><AllQuejas key={queja._id} queja={queja}/></Link>
            ))}

            {/* {quejasdelSector && quejasdelSector.map((queja)=>(
                    <div key={queja._id}>
                        <p>{queja.nombreComercial}</p>
                        <p>{queja.sector || queja.industria}</p>
                        <p>{queja.montivoReclamacion}</p>
                        <p>{queja.montoReclamado}</p>
                        <p>{queja.id}</p>
        
                    </div>
                ))
            } */}
        </div>
     );
}
 
export default QuejasSector;