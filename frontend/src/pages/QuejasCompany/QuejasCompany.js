
import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import QuejaCard from '../../components/QuejasFormats/QuejaCard'
import { QuejasContext } from '../../Context/QuejasContext'
//import BarChart from '../../components/BarChart'


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
                setQuejasEmpresa(quejasEmpresaJson)  //<--- will help to create a new DASHBOARD with it
            }catch(err){
                console.log('el error en GET QUEJAS POR EMPRESA -->')
            }

        } 
        getQuejasEmpresa()
    },[])

    const getValorBienOServicio = (quejasEmpresa) =>{
        let valorBienServicio = 0
        for(let queja of quejasEmpresa){
            valorBienServicio = valorBienServicio + queja.costo_bien_servicio
        }
        return valorBienServicio
    }

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
           
            <div className="data">   
                <h1 className="datah1">Quejas Detalladas de la Empresa "{quejasEmpresa && nombreComercial}" Recibidas en la PROFECO</h1>
                <p className="dataP">Se han encontrado un total de {quejasEmpresa && quejasEmpresa.length} quejas por bienes o servicios ascendentes a ${quejasEmpresa&& getValorBienOServicio(quejasEmpresa)} MXN  de los cuales han sido reclamados  reclamados  {quejasEmpresa&& getMontoTotalReclamado(quejasEmpresa)} MXN a {nombreComercial}. De estos, un total de {quejasEmpresa&& getMontoTotalRecuperado(quejasEmpresa)} ya han sido recuperados</p>
            </div>
            <div className="data">            
                <h2 className="datah2">Lista Detallada de Quejas de {nombreComercial} presentadas ante PROFECO:</h2>
                <p className="dataP">La siguiente lista, presenta de manera detallada las quejas que han sido sometidas ante PROFECO reclamando una mala práctica, incumplimiento o negativa por parte de {nombreComercial}.</p>
                <p className="dataP">Cada una de estas quejas cuenta con un ID oficial de PROFECO, así como el motivo por el cual fué presentada la queja, el costo del bien o servicio reclamado y el estátus de la queja (por ej. conciliada, en trámite, desistida etc).</p>
                <p className="dataP">Esta información ha sido tomada de fuentes públicas gubernamentales de México y posteriormente procesada por nuestro equipo para darle una presentación y visualización más sencilla y accesible al público en general.</p>
                {quejasEmpresa && quejasEmpresa
                    .sort((a,b)=>b.totalQuejas - a.totalQuejas)
                    .map((queja)=>(
                    <QuejaCard key={queja._id} queja={queja}/>
                ))}
            </div>
m 

        </div>
     );
}
 
export default QuejasCompany;