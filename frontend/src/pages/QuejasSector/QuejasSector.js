import './QuejasSector.css'
import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'

//import {useFetch} from '../Hooks/useFetch'
import AllQuejas from '../../../src/components/QuejasFormats/AllQuejas'

const QuejasSector = () => {
    const {sector} = useParams()
    const [quejasdelSector, setQuejasdelSector ] = useState(null)
    // const [montoReclamadoSector, setMontoReclamadoSector] = useState(0)
    // const [montoRecuperadoSector, setMontoRecuperadoSector] = useState(0)

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



    const getMontoTotalReclamado =(quejasdelSector)=>{
        let montoTotalReclamado = 0
        for(let queja of quejasdelSector){
            montoTotalReclamado = montoTotalReclamado + queja.monto_reclamado
        }
        return montoTotalReclamado
    }
    const getMontoTotalRecuperado =(quejasdelSector)=>{
        let montoTotalRecuperado = 0
        for(let queja of quejasdelSector){
            montoTotalRecuperado = montoTotalRecuperado + queja.monto_recuperado_b
        }
        return montoTotalRecuperado
    }
   
    
    return ( 
        <div className="containerWrap">
            <h1>ACA IRA EL LAY OUT DE QUEJAS POR SECTOR: {sector}</h1>

            <p>Se han encontrado un total de {quejasdelSector && quejasdelSector.length} quejas del sector {sector}</p>
            <p>Este Sector tiene un total de {quejasdelSector&&getMontoTotalReclamado(quejasdelSector)} MXN en montos reclamados de los cuales ha sido recuperado {quejasdelSector&&getMontoTotalRecuperado(quejasdelSector)} MXN</p>

            {quejasdelSector && quejasdelSector.map((queja)=>(                
                <Link to={"/"+sector+"/"+queja.nombre_comercial}><AllQuejas key={queja._id} queja={queja}/></Link>
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