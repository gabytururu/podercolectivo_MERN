
import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import SumQuejasCompany from '../../components/QuejasFormats/SumQuejasCompany'
import useQuejasByCategory from '../../Hooks/useQuejasByCategory'

//import {useFetch} from '../Hooks/useFetch'
import AllQuejas from '../../components/QuejasFormats/QuejaCard'

const QuejasSector = () => {
    const {sector} = useParams()
    const [quejasdelSector, setQuejasdelSector ] = useState(null)
    const [categoryBySector, setCategoryBySector] = useState('sector')

    useEffect(()=>{
        const getQuejasSector = async() =>{
            try{
                const fetchQuejasSector = await fetch(`http://localhost:5000/api/quejas/sector/${sector}`)

                const quejasSectorJson = await fetchQuejasSector.json()
                console.log('las queja del jsonObj-->',quejasSectorJson)
                await setQuejasdelSector(quejasSectorJson)
                await console.log('las quejas del useSTate-->',quejasdelSector)
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
        return valorBienServicio
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
    
    const getSectorSumPerCompany = (quejasdelSector) =>{
        let companiesInThisSectorArr = []
        quejasdelSector && quejasdelSector.map(queja => companiesInThisSectorArr.includes(queja.nombreComercial)?'':companiesInThisSectorArr.push(queja.nombreComercial))
        console.log(companiesInThisSectorArr)

        let companiesAggregatedIndicatorsArr =[]
        for(let company of companiesInThisSectorArr){
            let montoReclamado = 0
            let montoRecuperado = 0
            let costoBienServicio=0
            let sector =''
            let giro = ''

            const quejasThisCompany = quejasdelSector.filter((queja)=> queja.nombreComercial === company)
            const quejasQtyThisCompany = quejasThisCompany.length
            for(let queja of quejasThisCompany){
                montoReclamado = queja.monto_reclamado + montoReclamado
                montoRecuperado = queja.monto_recuperado_b + montoRecuperado
                costoBienServicio = queja.costo_bien_servicio + costoBienServicio
                sector = queja.sector
                giro = queja.giro
            }

            //costoTotalBienesyServicios: costoBienServicio, 
            const indicatorsPerCompany = {company:company, totalQuejas: quejasQtyThisCompany, montoTotalReclamado: montoReclamado, montoTotalRecuperado: montoRecuperado, sector: sector, giro: giro, costoBienServicio: costoBienServicio}
            companiesAggregatedIndicatorsArr.push(indicatorsPerCompany)
            
        }
        console.log(companiesAggregatedIndicatorsArr)
        return companiesAggregatedIndicatorsArr
    }
  
    return ( 
        <div className="containerWrap">
            <h1>ACA IRA EL LAY OUT DE QUEJAS POR SECTOR: {sector}</h1>

            <p>Se han encontrado un total de {quejasdelSector && quejasdelSector.length} quejas del sector {sector}</p>
            <p>Las Quejas de este sector son reclamos por transacciones de bienes o servicios que con un costo de {quejasdelSector&& getValorBienOServicio(quejasdelSector)} Resultante de un total de {quejasdelSector && getMontoTotalReclamado(quejasdelSector)} MXN en montos reclamados de los cuales ha sido recuperado {quejasdelSector && getMontoTotalRecuperado(quejasdelSector)} MXN</p>

            <h2>Las empresas del Sector {sector} con Más quejas Acumuladas:</h2>
            <div className="data">
                {quejasdelSector && getSectorSumPerCompany(quejasdelSector)
                    .sort((a,b)=>b.totalQuejas - a.totalQuejas)
                    .map((queja)=>(    
                    <Link to={'/'+ queja.sector + '/' + queja.company}>           
                    <SumQuejasCompany key={queja._id} queja={queja} /></Link>   


                    // <Link to={"/"+sector+"/"+queja.nombre_comercial}><AllQuejas key={queja._id} queja={queja}/></Link>
                    // <Link to={"/"+sector+"/"+queja.nombreComercial}><AllQuejas key={queja._id} queja={queja}/></Link>
                    ))
                } 
            </div>
        </div>
     );
}
 
export default QuejasSector;