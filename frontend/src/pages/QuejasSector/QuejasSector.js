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

    const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany,barChartColor, barChartRadius} = useContext(QuejasContext)

    const {sector} = useParams()
    const [quejasdelSector, setQuejasdelSector ] = useState(null)
    // const [categoryBySector, setCategoryBySector] = useState('sector')

    useEffect(()=>{
        const getQuejasSector = async() =>{
            try{
                const fetchQuejasSector = await fetch(`http://localhost:5000/api/quejas/sector/${sector}`)
                const quejasSectorJson = await fetchQuejasSector.json()
                setQuejasdelSector(quejasSectorJson)
                const quejasSector = sumQuejasPerCategory(quejasSectorJson, categoryCompany)
                setGraphPerSector({
                    labels: quejasSector.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=>quejas.company),
                    datasets: [{
                        label: 'Quejas por Sector',
                        data: quejasSector.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=> quejas.totalQuejas),
                        backgroundColor: barChartColor,
                        borderRadius: barChartRadius
                   }]
                })

              
            }catch(err){
                console.log('el error fue-->',err)
            }
        }
        getQuejasSector()  
    },[])

    // OJO OPTIMIZAR/REFACTOR -- Todo el codigo de abajo creo puede/debe sustituirse por el useQuejasByCategory hook!!! ahorrando unas 50 lineas de codigo ?
        // const quejasAggregatedBySector = useQuejasByCategory(quejasdelSector, categoryBySector)

    const getValorBienOServicio =(quejasdelSector)=>{
        let valorBienServicio = 0
        for(let queja of quejasdelSector){
            valorBienServicio = valorBienServicio + queja.costo_bien_servicio
        }
        return valorBienServicio.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0, maximumFractionDigits: 0,})
    }

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
        <div className="containerWrap">
            <div className="data">
                <h1 className="datah1">Quejas Recibidas ante la PROFECO del Sector {sector}</h1>
                <p className="dataP">Del año 2022 a la fecha han sido interpuestas ante PROFECO un total de <b>{quejasdelSector && quejasdelSector.length} quejas</b> por malas prácticas o incumplimientos de las <b>empresas del sector {sector}</b></p>
                <p className="dataP">Las Quejas de este sector son reclamos por transacciones de bienes o servicios que ascienden a un valor de <b>{quejasdelSector&& getValorBienOServicio(quejasdelSector)} MXN</b></p>
                    <BarChart chartData={graphPerSector}/>    
                <h2 className="datah2">Lista Detallada de Quejas Acumuladas por Cada Empresa del sector {sector} </h2>
                <p className="dataP">Da click o tap en cada una para conocer el motivo y estátus de las quejas acumuladas por empresa </p>
                    {quejasdelSector && sumQuejasPerCategory(quejasdelSector,categoryCompany)
                    .sort((a,b)=>b.totalQuejas - a.totalQuejas)
                    .map((queja)=>(    
                    <Link to={'/'+ queja.sector + '/' + queja.company}>           
                    <SumQuejasCompany key={queja._id} queja={queja} /></Link>   
                    ))
                    } 
            </div>
        </div>
     );
}
 
export default QuejasSector;