import {useParams, Link} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import { QuejasContext } from '../../Context/QuejasContext'
import BarChart from '../../components/BarChart/BarChart'
import SumQuejasCompany from '../../components/QuejasFormats/SumQuejasCompany'


//quejas singleGiro
const QuejasGiro = () => {
    
    const {giroParam} = useParams()
    const [quejasDelGiro, setQuejasDelGiro ] = useState(null)
    const [graphSingleGiro, setGraphSingleGiro] = useState({
        labels: [],
        datasets: [{
            label: `Quejas del Giro ${giroParam}`,
            data: [],
            backgroundColor: '#1ac6edb0',
            borderRadius: 5,
       }]
    })
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getQuejasGiro = async() =>{
            try{
                const fetchQuejasGiro = await fetch(`http://localhost:5000/api/quejas-profeco/singleGiro/${giroParam}`)
                const quejasGiroJson = await fetchQuejasGiro.json()
                console.log(quejasGiroJson)
                if(fetchQuejasGiro.ok){
                    setGraphSingleGiro({
                        labels: quejasGiroJson.slice(0,19).map((quejas)=>quejas._id),
                        datasets: [{
                            label: 'Quejas por Giro',
                            data: quejasGiroJson.slice(0,19).map((quejas)=> quejas.totalComplaints),
                            backgroundColor: '#1ac6edb0',
                            borderRadius: 5
                       }]
                    })
                    setLoading(false)
                    setQuejasDelGiro(quejasGiroJson)
                }            
            }catch(err){
                console.log('error en fetch SingleGiro-->',err)
                setLoading(false)
            }
        }
        getQuejasGiro()  
    },[])

    
    // const getValorBienOServicio =(quejasdelGiro)=>{
    //     let valorBienServicio = 0
    //     for(let queja of quejasdelGiro){
    //         valorBienServicio = valorBienServicio + queja.costo_bien_servicio
    //     }
    //     return valorBienServicio.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0, maximumFractionDigits: 0,})
    // }

    // const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany, graphPerGiro, setGraphPerGiro, barChartColor, barChartRadius} = useContext(QuejasContext)

    // const {giroParamUrl} = useParams()
    // const [quejasDelGiro, setQuejasDelGiro ] = useState(null)
    // // const [categoryBySector, setCategoryBySector] = useState('sector')

    // useEffect(()=>{
    //     const getQuejasGiro = async() =>{
    //         try{
    //             const fetchQuejasGiro = await fetch(`http://localhost:5000/api/quejas-profeco/giro/${giroParamUrl}`)
    //             const quejasGiroJson = await fetchQuejasGiro.json()
    //             setQuejasDelGiro(quejasGiroJson)
    //             const quejasGiro = sumQuejasPerCategory(quejasGiroJson, categoryCompany)
    //             setGraphPerGiro({
    //                 labels: quejasGiro.sort((a,b)=>b.totalQuejas - a.totalQuejas).slice(0,19).map((quejas)=>quejas.nombreComercialCorto),
    //                 datasets: [{
    //                     label: 'Quejas por Giro',
    //                     data: quejasGiro.sort((a,b)=>b.totalQuejas - a.totalQuejas).slice(0,19).map((quejas)=> quejas.totalQuejas),
    //                     backgroundColor: barChartColor,
    //                     borderRadius: barChartRadius
    //                }]
    //             })

              
    //         }catch(err){
    //             console.log('el error fue-->',err)
    //         }
    //     }
    //     getQuejasGiro()  
    // },[])

    
    // const getValorBienOServicio =(quejasdelGiro)=>{
    //     let valorBienServicio = 0
    //     for(let queja of quejasdelGiro){
    //         valorBienServicio = valorBienServicio + queja.costo_bien_servicio
    //     }
    //     return valorBienServicio.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0, maximumFractionDigits: 0,})
    // }

    return ( 
        <div className="containerWrap" style={{ whiteSpace: 'pre-line' }}>
        <div className="data" >

            {loading?
                <p>Cargando...</p>
                :
                <BarChart chartData={graphSingleGiro}/>    
            }

            {quejasDelGiro && quejasDelGiro 
                .slice(0,9)
                .map((queja,i)=>(    
                <Link to={'/singleCompany/' + queja.empresaParam}>           
                    <SumQuejasCompany key={i} queja={queja} />
                </Link>   
                ))
            }    
            {/* <h1 className="datah1">Quejas en PROFECO de Empresas del Giro: {'\n'} "{quejasDelGiro&&quejasDelGiro[0].giro}"</h1>
            <p className="dataP">Del año 2022 a la fecha han sido interpuestas ante PROFECO un total de 
            {
                quejasDelGiro && quejasDelGiro.length === 1 ?
                <b> {quejasDelGiro &&quejasDelGiro.length} queja </b>
                :
                <b> {quejasDelGiro &&quejasDelGiro.length} quejas </b>
                
            } 
            por malas prácticas o incumplimientos de las <b>empresas del giro: "{quejasDelGiro&&quejasDelGiro[0].giro.toLowerCase()}"</b></p>
            <p className="dataP">Las Quejas de este giro comercial corresponden a reclamos o controversias por transacciones de bienes o servicios que ascienden a un valor de <b>{quejasDelGiro && getValorBienOServicio(quejasDelGiro)} MXN</b></p>
                <BarChart chartData={graphPerGiro}/>    
            <h2 className="datah2">Lista detallada de quejas acumuladas por empresas del giro {'\n'} "{quejasDelGiro&&quejasDelGiro[0].giro}" </h2>
            <p className="dataP">Da click a cada una si quieres conocer el motivo o el estátus de las quejas y controversias vinculadas a empresas de este giro comercial </p>
                {quejasDelGiro && sumQuejasPerCategory(quejasDelGiro,categoryCompany)
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
 
export default QuejasGiro;
