import {useState, useEffect, useContext} from 'react'
import useQuejasByCategory from '../../Hooks/useQuejasByCategory'
import SumQuejasSector from '../../../src/components/QuejasFormats/SumQuejasSector'
import SumQuejasCompany from '../../../src/components/QuejasFormats/SumQuejasCompany'
import SumQuejasGiro from '../../components/QuejasFormats/SumQuejasGiro'
import QuejaCard from '../../../src/components/QuejasFormats/QuejaCard'
import './Home.css'
import {Link} from 'react-router-dom'
//import BarChart from '../../components/BarChart/BarChart'
import BarChart from '../../components/BarChart/BarChart'
import {UserData} from '../../Data'
import { QuejasContext } from '../../Context/QuejasContext'
// import ChartDataLabels from 'chartjs-plugin-datalabels'
//import {Chart as ChartJs} from 'chart.js/auto' <--- only need it on the component

   // const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany, graphPerGiro, setGraphPerGiro, barChartColor, barChartRadius} = useContext(QuejasContext)
   // const {graphPerCompany, setGraphPerCompany} = useContext(QuejasContext)

const Home = () => {
 
    const [topQuejasAllCompanies, setTopQuejasAllCompanies] = useState([])
    const [graphPerCompany, setGraphPerCompany] = useState({
        labels: [],
        datasets: [{
            label: 'Quejas por Empresa',
            data: [],
            backgroundColor: '#1ac6edb0',
            borderRadius: 5,
       }]})
    const [loading,setLoading]=useState(true)
    const barChartColor = '#1ac6edb0';

    useEffect(()=>{
        
        const fetchQuejas = async()=>{
            try{
                const topCompanies = await fetch('http://localhost:5000/api/quejas-profeco/topEmpresa')
                console.log('LAS QUEJAS OBJECT --> ',topCompanies)
                const topCompaniesJson = await topCompanies.json()
                console.log('las Quejas Json', topCompaniesJson)
             
                if(topCompanies.ok ){
                    // no logro entender porqué al hacer el puente con este nuevo estado, la renderización no ocurre bien... renderiza el graph sin datos siempre
                    // setTopQuejasAllCompanies(topCompaniesJson) 
                    setGraphPerCompany({
                        labels: topCompaniesJson.slice(0,10).map((queja)=>queja._id),
                        datasets: [{
                            label: 'Quejas por Empresa',
                            data: topCompaniesJson.slice(0,10).map((queja)=> queja.totalComplaints),
                            backgroundColor: barChartColor,
                            borderRadius: 5,
                        }]
                    })
                    setLoading(false)
                    setTopQuejasAllCompanies(topCompaniesJson)
                }
            }catch(err){
                console.log('hubo un error: ', err)
                setLoading(false)
            }         
      
            // try{
            //     const quejasObject = await fetch('http://localhost:5000/api/quejas-profeco/')
            //     const quejasJson = await quejasObject.json()
            // if(quejasObject.ok){
            //         setQuejas(quejasJson)
            //         const quejasSector = sumQuejasPerCategory(quejasJson, categorySector)
            //         const quejasCompany= sumQuejasPerCategory(quejasJson, categoryCompany)
            //         const quejasGiro= sumQuejasPerCategory(quejasJson,categoryGiro)
            //         setQuejasPerSector(quejasSector)
            //         setQuejasPerCompany(quejasCompany)
            //         setQuejasPerGiro(quejasGiro)
            //         setGraphPerSector({
            //             labels: quejasSector.sort((a,b)=>b.totalQuejas - a.totalQuejas).slice(0,9).map((quejas)=>quejas.company),
            //             datasets: [{
            //                 label: 'Quejas por Sector',
            //                 data: quejasSector.sort((a,b)=>b.totalQuejas - a.totalQuejas).slice(0,9).map((quejas)=> quejas.totalQuejas),
            //                 backgroundColor: barChartColor,
            //                 // // borderColor:'#000000',
            //                 // // borderWidth:2,
            //                 borderRadius: barChartRadius
            //            }]
            //         })
            //         setGraphPerCompany({
            //             labels: quejasCompany.sort((a,b)=>b.totalQuejas - a.totalQuejas).slice(0,9).map((quejas)=>quejas.company),
            //             datasets: [{
            //                 label: 'Quejas por Empresa',
            //                 data: quejasCompany.sort((a,b)=>b.totalQuejas - a.totalQuejas).slice(0,9).map((quejas)=> quejas.totalQuejas),
            //                 backgroundColor: barChartColor,
            //                 borderRadius: barChartRadius,
            //                 // datalabels:{
            //                 //     color:'yellow',
            //                 //     weight:200,
            //                 //     fontSize: 55,
            //                 //     align: 'center'
                                
            //                 // }

            //            }]
            //         })
            //         setGraphPerGiro({
            //             labels: quejasGiro.sort((a,b)=>b.totalQuejas - a.totalQuejas).slice(0,9).map((quejas)=>quejas.giro),
            //             datasets: [{
            //                 label: 'Quejas por Giro Comercial',
            //                 data: quejasGiro.sort((a,b)=>b.totalQuejas - a.totalQuejas).slice(0,9).map((quejas)=> quejas.totalQuejas),
            //                 backgroundColor: barChartColor,
            //                 borderRadius: barChartRadius,
            //                 // datalabels:{
            //                 //     color:'yellow',
            //                 //     weight:200,
            //                 //     fontSize: 55,
            //                 //     align: 'center'
                                
            //                 // }

            //            }]
            //         })
            //     }
            // }catch(err){
            //     console.log('hubo un error: ', err)
            // }         
        }   
        fetchQuejas()              
    },[])
    
    const titleChart = `Empresas con más quejas en \n PROFECO México`
 
    return ( 
       
      
        <div style={{ whiteSpace: 'pre-line' }}>           
           <div className="heroImage">
                <div className="heroText">
                    <h1>Poder Colectivo</h1>
                    <h2>Una representación visual de las quejas de empresas mexicanas ante la PROFECO</h2> 
                    <p className="italic">Por su reputación los conoceréis...</p>
                    <p className="regular">Página creada con <span>❤️</span> de Mexas para Mexas</p>
                </div>
            </div>           
            <div className="containerWrap">
                <div className="data"> 
                    <h2 className="datah2">{titleChart}</h2> 
                    { loading ?
                        <p>Cargando...</p>
                    : 
                        <BarChart chartData={graphPerCompany}/>     
                    }

                    <p className="dataP">La gráfica muestra la lista de las 10 empresas que han recibido más quejas ante la Procuraduría Federal del Consumidor (PROFECO) en México durante el período pasado(2022) y lo que va de 2023*</p> 
                </div>
            </div>
            <div className="pattern">
                <div className="containerWrap">
                    <div className="data">
                            <h3 className="datah3">Detalles de las Quejas por Empresa</h3> 
                            <p className="dataP">Conoce los detalles de las quejas acumuladas por empresa  por ej. el motivo de la queja ante PROFECO, su estátus actual, su valor económico y más:</p> 
                                {/* OJO AQUI-- intente key con i, queja.i, queja._id, pero TODAS arrojan el error de Warning: Each child in a list should have a unique "key" prop en HOME, QUEJASCOMPANIESCOMPLETE Y QUEJASSECTORESCOMPLETE  */}
                                {topQuejasAllCompanies                       
                                    .slice(0,4)
                                    .map((queja,i)=>(
                                        <Link to={'/singleCompany/' + queja.empresaParam}><SumQuejasCompany key={i} queja={queja}/></Link>
                                        // <SumQuejasCompany key={i} queja={queja}/>
                                    ))
                                }
                            {/* <Link className="button" to="/empresas" state={categoryCompany && {quejas:quejas, categoryByCompanies:categoryCompany}}>Ver Todas las Empresas</Link> */}
                    </div>
                </div>
            </div>
        </div>      
                 
             
            );
}
export default Home; 
           
          // arreglar mini glitch de sticky navbar?
            // incluir un ranking display en el card --> ej. #1 , #2 etc
            //  0. mejorar responsiveness de charts?? o no necesario=?
            //  0.poner logo PODERcOLECTIVO en graficas
            // 0. CAMBIAR Display de SECTOR por display DE GIRO 
            // 0. GENERAR DASHBOARD DE INFO PARA INDIVIDUAL CARDS
            // 0. FOOTER incluir info mas seria y mejorar layout y demas
            // 0. quitar la m que aparece random en el page de detailed cards

  //      0. script para quitar la razon social de los nombres para crear columna con nombres cortos - para el barchart
 //               0. ARREGLAR LAS URLS que salen con % y codigos numericos en vez d esimbolos
//                     
//             4. revisar que onda con los INDEX como key... no se si deba quedar asi.. leer un poco del tema o ver videos de curso?
//         
//             9. crear rendering views para  "cantidad de quejas" VS "cantidad de monto reclamado" --definir si seran componentes que se renderizan ambos (ej arriba quejas abajo montos) o si         seran conditional rendering tmb
//             10. test carga de DB real de profeco desde json/excel
//             12. crear modulo de POST QUEJA y layout UX/UI para definir donde se pondra eso y como nutrira el sitio RELATIVO a la data oficial
//             13. ya deahi..definir q pedo con un test de db real con volu¿men de datos alto y con el deployment (ej medidas de seguridad para DB, IP etc)
//             12. ver auth jtx MERN net ninja??
//             }*/
           
//         