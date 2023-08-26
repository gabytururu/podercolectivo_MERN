
import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import QuejaCard from '../../components/QuejasFormats/QuejaCard'
import { QuejasContext } from '../../Context/QuejasContext'


const QuejasCompany = () => {

    const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany} = useContext(QuejasContext)
    
    // const {sector, nombre_comercial} = useParams()
    const {sector, nombreComercial} = useParams()
    const [quejasEmpresa, setQuejasEmpresa] = useState(null)

    useEffect(()=>{
        const getQuejasEmpresa = async() =>{
            try{
                
                const fetchQuejasEmpresa = await fetch(`http://localhost:5000/api/quejas/${sector}/${nombreComercial}`)
                const quejasEmpresaJson = await fetchQuejasEmpresa.json()
                setQuejasEmpresa(quejasEmpresaJson)  
                sumQuejasPerCategory(quejasEmpresaJson, categoryCompany)  //<--- will help to create a new DASHBOARD with it
            }catch(err){
                console.log('el error en GET QUEJAS POR EMPRESA -->')
            }

        } 
        getQuejasEmpresa()
    },[])

    const getMontoTotalReclamado =(quejasEmpresa)=>{
        let montoTotalReclamado = 0
        for(let queja of quejasEmpresa){
            montoTotalReclamado = montoTotalReclamado + queja.monto_reclamado
        }
        return montoTotalReclamado
    }
    const getMontoTotalRecuperado =(quejasEmpresa)=>{
        let montoTotalRecuperado = 0
        for(let queja of quejasEmpresa){
            montoTotalRecuperado = montoTotalRecuperado + queja.monto_recuperado_b
        }
        return montoTotalRecuperado
    }
   

    return ( 
        <div className="containerWrap">
            <h1>Quejas sobre la empresa "{quejasEmpresa && nombreComercial}" México del Sector {sector} recibidas en PROFECO</h1>
            <p>Se han encontrado un total de {quejasEmpresa && quejasEmpresa.length} quejas equivalentes a {quejasEmpresa&& getMontoTotalReclamado(quejasEmpresa)} MXN en montos reclamados de a {nombreComercial} de los cuales han sido recuperados {quejasEmpresa&& getMontoTotalRecuperado(quejasEmpresa)}</p>
            <div className="data">
                {quejasEmpresa && quejasEmpresa
                    // .sort((a,b)=>b.totalQuejas - a.totalQuejas)
                    .map((queja)=>(
                    <QuejaCard key={queja._id} queja={queja}/>
                ))}
            </div>
m 

        </div>
     );
}
 
export default QuejasCompany;