import '../Home/Home.css'
import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import SumQuejasCompany from '../../components/QuejasFormats/SumQuejasCompany'
import SumQuejasSector from '../../components/QuejasFormats/SumQuejasSector'
import useQuejasByCategory from '../../Hooks/useQuejasByCategory'
import {useContext} from 'react'
import { QuejasContext } from '../../Context/QuejasContext'
// import AllQuejas from '../../components/QuejasFormats/QuejaCard'
//import BarChart from '../../components/BarChart'
import BarChart from '../../components/BarChart/BarChart'


const QuejasSector = () => {

    const {sectorParamUrl} = useParams()
    console.log('mi sector param es -->',sectorParamUrl)
    const[quejasDelSector, setQuejasDelSector] = useState([])
    const [graphSingleSector, setGraphSingleSector] = useState ({
        labels: [],
        datasets: [{
            label: `Quejas del Sector ${sectorParamUrl}`,
            data: [],
            backgroundColor: '#1ac6edb0',
            borderRadius: 5,
        }]
     })
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getQuejasSingleSector = async() =>{
            try{
                const fetchQuejasDelSector = await fetch(`http://localhost:5000/api/quejas-profeco/singleSector/${sectorParamUrl}`)
                console.log('fetching quejas sector object-->',fetchQuejasDelSector)
                const quejasSectorJson = await fetchQuejasDelSector.json()
                console.log('el json del quejas sector',quejasSectorJson)
                if(fetchQuejasDelSector.ok){
                    setGraphSingleSector({
                        labels: quejasSectorJson.slice(0,9).map((queja)=>queja._id),
                        datasets: [{
                            label: `Quejas del Sector ${sectorParamUrl}`,
                            data: quejasSectorJson.slice(0,9).map((queja)=>queja.totalComplaints),
                            backgroundColor: '#1ac6edb0',
                            borderRadius: 5,
                       }]
                    })
                    setLoading(false)
                    setQuejasDelSector(quejasSectorJson)
                    console.log('quejas sector desde el try-->',quejasDelSector)
                }
            }catch(err){
                console.log('error en fetch singleSector:', err)
                setLoading(false)
            }
        }
        getQuejasSingleSector()
    },[])

    // const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany,barChartColor, barChartRadius} = useContext(QuejasContext)

    // const {sectorParamUrl} = useParams()
    // const [quejasdelSector, setQuejasdelSector ] = useState(null)
    // // const [categoryBySector, setCategoryBySector] = useState('sector')

    // useEffect(()=>{
    //     const getQuejasSector = async() =>{
    //         try{
    //             const fetchQuejasSector = await fetch(`http://localhost:5000/api/quejas-profeco/sector/${sectorParamUrl}`)
    //             const quejasSectorJson = await fetchQuejasSector.json()
    //             setQuejasdelSector(quejasSectorJson)
    //             const quejasSector = sumQuejasPerCategory(quejasSectorJson, categoryCompany)
    //             setGraphPerSector({
    //                 labels: quejasSector.sort((a,b)=>b.totalQuejas - a.totalQuejas).slice(0,19).map((quejas)=>quejas.nombreComercialCorto),
    //                 datasets: [{
    //                     label: 'Quejas por Sector',
    //                     data: quejasSector.sort((a,b)=>b.totalQuejas - a.totalQuejas).slice(0,19).map((quejas)=> quejas.totalQuejas),
    //                     backgroundColor: barChartColor,
    //                     borderRadius: barChartRadius
    //                }]
    //             })

              
    //         }catch(err){
    //             console.log('el error fue-->',err)
    //         }
    //     }
    //     getQuejasSector()  
    // },[])

    // // OJO OPTIMIZAR/REFACTOR -- Todo el codigo de abajo creo puede/debe sustituirse por el useQuejasByCategory hook!!! ahorrando unas 50 lineas de codigo ?
    //     // const quejasAggregatedBySector = useQuejasByCategory(quejasdelSector, categoryBySector)

    // const getValorBienOServicio =(quejasdelSector)=>{
    //     let valorBienServicio = 0
    //     for(let queja of quejasdelSector){
    //         valorBienServicio = valorBienServicio + queja.costo_bien_servicio
    //     }
    //     return valorBienServicio.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0, maximumFractionDigits: 0,})
    // }

    // const getMontoTotalReclamado =(quejasdelSector)=>{
    //     let montoTotalReclamado = 0
    //     for(let queja of quejasdelSector){
    //         montoTotalReclamado = montoTotalReclamado + queja.monto_reclamado
    //     }
    //     return montoTotalReclamado
    // }
    // const getMontoTotalRecuperado =(quejasdelSector)=>{
    //     let montoTotalRecuperado = 0
    //     for(let queja of quejasdelSector){
    //         montoTotalRecuperado = montoTotalRecuperado + queja.monto_recuperado_b
    //     }
    //     return montoTotalRecuperado
    // }
    
    // const getSectorSumPerCompany = (quejasdelSector) =>{
    //     let companiesInThisSectorArr = []
    //     quejasdelSector && quejasdelSector.map(queja => companiesInThisSectorArr.includes(queja.nombreComercial)?'':companiesInThisSectorArr.push(queja.nombreComercial))
    //     console.log(companiesInThisSectorArr)

    //     let companiesAggregatedIndicatorsArr =[]
    //     for(let company of companiesInThisSectorArr){
    //         let montoReclamado = 0
    //         let montoRecuperado = 0
    //         let costoBienServicio=0
    //         let sector =''
    //         let giro = ''

    //         const quejasThisCompany = quejasdelSector.filter((queja)=> queja.nombreComercial === company)
    //         const quejasQtyThisCompany = quejasThisCompany.length
    //         for(let queja of quejasThisCompany){
    //             montoReclamado = queja.monto_reclamado + montoReclamado
    //             montoRecuperado = queja.monto_recuperado_b + montoRecuperado
    //             costoBienServicio = queja.costo_bien_servicio + costoBienServicio
    //             sector = queja.sector
    //             giro = queja.giro
    //         }

    //         //costoTotalBienesyServicios: costoBienServicio, 
    //         const indicatorsPerCompany = {company:company, totalQuejas: quejasQtyThisCompany, montoTotalReclamado: montoReclamado, montoTotalRecuperado: montoRecuperado, sector: sector, giro: giro, costoBienServicio: costoBienServicio}
    //         companiesAggregatedIndicatorsArr.push(indicatorsPerCompany)
            
    //     }
    //     console.log(companiesAggregatedIndicatorsArr)
    //     return companiesAggregatedIndicatorsArr
    // }

    return ( 
        <div className="containerWrap" style={{ whiteSpace: 'pre-line' }}>
            <div className="data">
                {loading?
                    <p>Cargando...</p>
                    :
                    <BarChart chartData={graphSingleSector}/>
                }
                {quejasDelSector && quejasDelSector
                    .slice(0,9)
                    .map((queja,i)=>(                       
                        <Link to={'/singleCompany/' + queja.empresaParam}>           
                            <SumQuejasCompany key={i} queja={queja} />
                        </Link>   
                    ))
                }
                {console.log('Quejas del sector desde el render-->',quejasDelSector)}
                {/* <h1 className="datah1">Quejas Recibidas ante la PROFECO del Sector {sectorParamUrl}</h1>
                <p className="dataP">Del año 2022 a la fecha han sido interpuestas ante PROFECO un total de 
                {
                quejasdelSector && quejasdelSector.length === 1 ?
                <b> {quejasdelSector &&quejasdelSector.length} queja </b>
                :
                <b> {quejasdelSector &&quejasdelSector.length} quejas </b>
                } 
                por malas prácticas o incumplimientos de las <b>empresas del sector {sectorParamUrl}</b></p>
                <p className="dataP">Las Quejas de este sector son reclamos por transacciones de bienes o servicios que ascienden a un valor de <b>{quejasdelSector&& getValorBienOServicio(quejasdelSector)} MXN</b></p>
                    <BarChart chartData={graphPerSector}/>    
                <h2 className="datah2">Lista Detallada de Quejas Acumuladas por Cada Empresa del sector {sectorParamUrl} </h2>
                <p className="dataP">Da click o tap en cada una para conocer el motivo y estátus de las quejas acumuladas por empresa </p>
                    {quejasdelSector && sumQuejasPerCategory(quejasdelSector,categoryCompany)
                    .sort((a,b)=>b.totalQuejas - a.totalQuejas)
                    .slice(0,9)
                    .map((queja)=>(    
                    <Link to={'/empresa/' + queja.nombreComercialParamUrl}>           
                    <SumQuejasCompany key={queja._id} queja={queja} /></Link>   
                    ))
                    }  */}
            </div>
        </div>
     );
}
 
export default QuejasSector;