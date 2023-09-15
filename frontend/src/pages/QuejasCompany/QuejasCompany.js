
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

        let valorMoneyFormat = valorBienServicio.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0,
        maximumFractionDigits: 0,});
       // return valorBienServicio
        return valorMoneyFormat
    }

    const getStatus =()=>{

    }

    const getMotivos = ()=>{

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
                <p className="dataP">Existen un total de total de {quejasEmpresa && quejasEmpresa.length} quejas de {nombreComercial} interpuestas ante PROFECO. El valor total de los bienes o servicios vinculados a estas quejas asciende a {quejasEmpresa&& getValorBienOServicio(quejasEmpresa)} MXN</p>
            </div>
            <div className="infoGraphic">
                <div className="info">
                    <h2>Cantidad Total de las Quejas de {'\n'} {nombreComercial}</h2>
                    <p>{quejasEmpresa && quejasEmpresa.length}</p>
                </div>
                <div className="info">
                    <h2>Valor Total de las Quejas de {nombreComercial}</h2>
                    <p>{quejasEmpresa&& getValorBienOServicio(quejasEmpresa)}</p>
                    <p><small>*Valor en MXN</small></p>
                </div>
                <div className="info">
                    <h2>Estátus de las Quejas de {nombreComercial}</h2>
                    <p>GRAFICO</p>
                </div>
                <div className="info">
                    <h2>Motivos Principales de las Queja de {nombreComercial}</h2>
                    <p>GRAFICO</p>
                </div>
            </div>
            <div className="data">            
                <h2 className="datah2">Lista Detallada de Quejas de {nombreComercial} presentadas ante PROFECO:</h2>
                <p className="dataP">La siguiente lista, presenta de manera detallada las quejas que han sido sometidas ante PROFECO reclamando una mala práctica, incumplimiento o negativa por parte de {nombreComercial}.</p>
                <p className="dataP">Cada una de estas quejas cuenta con un ID oficial de PROFECO, así como el motivo por el cual fué presentada la queja, el costo del bien o servicio reclamado y el estátus de la queja (por ej. conciliada, en trámite, desistida etc).</p>
                {quejasEmpresa && quejasEmpresa
                    .sort((a,b)=>b.totalQuejas - a.totalQuejas)
                    .map((queja)=>(
                    <QuejaCard key={queja._id} queja={queja}/>
                ))}
                <p className="dataP">Toda la información presentada en estas fichas ha sido recabada de fuentes oficiales, públicas, y gubernamentales de México y posteriormente procesada por nuestro equipo para crear una  visualización más sencilla y accesible al público en general.</p>
            </div> 

        </div>
     );
}
 
export default QuejasCompany;