import {useState, useEffect, useContext} from 'react'
import useQuejasByCategory from '../../Hooks/useQuejasByCategory'
import SumQuejasSector from '../../../src/components/QuejasFormats/SumQuejasSector'
import SumQuejasCompany from '../../../src/components/QuejasFormats/SumQuejasCompany'
import QuejaCard from '../../../src/components/QuejasFormats/QuejaCard'
import './Home.css'
import {Link} from 'react-router-dom'
//import BarChart from '../../components/BarChart/BarChart'
import BarChart from '../../components/BarChart/BarChart'
import {UserData} from '../../Data'
import { QuejasContext } from '../../Context/QuejasContext'
// import ChartDataLabels from 'chartjs-plugin-datalabels'
//import {Chart as ChartJs} from 'chart.js/auto' <--- only need it on the component

const Home = () => {
    const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany} = useContext(QuejasContext)

    useEffect(()=>{
        const fetchQuejas = async()=>{
            try{
                const quejasObject = await fetch('http://localhost:5000/api/quejas/')
                const quejasJson = await quejasObject.json()
            if(quejasObject.ok){
                    setQuejas(quejasJson)
                    const quejasSector = sumQuejasPerCategory(quejasJson, categorySector)
                    const quejasCompany= sumQuejasPerCategory(quejasJson, categoryCompany)
                    setQuejasPerSector(quejasSector)
                    setQuejasPerCompany(quejasCompany)
                    setGraphPerSector({
                        labels: quejasSector.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=>quejas.company),
                        datasets: [{
                            label: 'Quejas por Sector',
                            data: quejasSector.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=> quejas.totalQuejas),
                            backgroundColor: [
                                '#1ac8ed', //blue
                                // '#1ac6edb0',
                                // '#005494',
                                // '#ff6347',
                                // '#ffba08',
                            ],
                            // borderColor:'#000000',
                            // borderWidth:2,
                            borderRadius: 10
                       }]
                    })
                    setGraphPerCompany({
                        labels: quejasCompany.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=>quejas.company),
                        datasets: [{
                            label: 'Quejas por Empresa',
                            data: quejasCompany.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=> quejas.totalQuejas),
                            backgroundColor: [
                                '#1ac8ed', //blue
                                // '#1ac6edb0',
                                // '#005494',
                                // '#ff6347',
                                // '#ffba08',
                            ],
                            // borderColor:'#000000',
                            // borderWidth:2,
                            borderRadius: 8,
                            // options: {
                            //     plugins:{
                            //         datalabels:{
                            //             color:'yellow',
                            //             fontSize: 35
                            //         }
                            //     }
                            // },
                            // datalabels:{
                            //     color:'yellow',
                            //     weight:200,
                            //     fontSize: 55,
                            //     align: 'center'
                                
                            // }

                       }]
                    })
                }
            }catch(err){
                console.log('hubo un error: ', err)
            }         
        }   
        fetchQuejas()              
    },[])

    return ( 
        

        <div>
           
           <div className="heroImage">
                <div className="heroText">
                    <h1>Poder Colectivo</h1>
                    <h2>Conoce la reputación de las empresas mexicanas a través de las estadísticas de PROFECO</h2> 
                    <p>Página creada con <span>❤️</span> de Mexas para Mexas</p>
                    <p>¡Ayúdanos a Elevar el Poder Colectivo!</p>
                </div>
            </div>

            <div className="containerWrap">
                <div className="data"> 
                    <h2>Sectores Comerciales con Más Quejas en PROFECO México</h2> 
                    <p>La gráfica siguiente presenta la lista de empresas que han recibido más quejas ante la Procuraduría Federal del Consumidor (PROFECO) en México durante el período pasado (2022) y lo que va de 2023*</p> 
                    <BarChart chartData={graphPerSector}/>                                      
                    <h3>Lista de Quejas Acumuladas por Sector</h3> 
                    <p>Da click o tap en cada una para conocer las quejas de las empresas de cada sector:</p> 
                            {quejasPerSector
                                .sort((a,b)=>b.totalQuejas - a.totalQuejas)
                                .map((queja)=>(
                                    <Link to={'/sector/'+ queja.sector}><SumQuejasSector key={queja._id} queja={queja}/></Link>
                                ))
                            }
                        <Link className="button" to={'/sectores'} state={categorySector && {quejas:quejas, categoryBySector:categorySector }}>Ver Más</Link>
                </div>
            
                <div className="data"> 
                    <h2>Empresas con Más Quejas en PROFECO México</h2> 
                    <p>La gráfica siguiente presenta la lista de las 10 empresas que han recibido más quejas ante la Procuraduría Federal del Consumidor (PROFECO) en México durante el período pasado(2022) y lo que va de 2023*</p> 
                    <BarChart chartData={graphPerCompany}/>                             

                    <h3>Lista de Quejas Acumuladas por Empresa</h3> 
                    <p>Da click o tap en cada una para conocer el detalle oficial de cada una de estas quejas por empresa (ej. motivo de la queja, estátus, valor económico asociado y ID oficial de la queja ante PROFECO) quejas de las empresas de cada sector:</p> 
                        {/* OJO AQUI-- intente key con i, queja.i, queja._id, pero TODAS arrojan el error de Warning: Each child in a list should have a unique "key" prop en HOME, QUEJASCOMPANIESCOMPLETE Y QUEJASSECTORESCOMPLETE  */}
                        {quejasPerCompany
                            .sort((a,b)=>b.totalQuejas - a.totalQuejas)
                            .map((queja,i)=>(
                                <Link to={'/'+ queja.sector + '/' + queja.company}><SumQuejasCompany key={i} queja={queja}/></Link>
                            ))
                        }
                    <Link className="button" to="/empresas" state={categoryCompany && {quejas:quejas, categoryByCompanies:categoryCompany}}>Ver Más</Link>
                </div>
            </div>
        </div>
            );
}
export default Home;   
              //  0. CSS -- CREO Hace sentido llevar el CSS del barchart de HOME a BARCHART Component. para que se repliquen siempre esos setups asi como las options
  //      0. script para quitar la razon social de los nombres para crear columna con nombres cortos - para el barchart
 //               0. ARREGLAR LAS URLS que salen con % y codigos numericos en vez d esimbolos
//             1. VER MAS de companies (home) no funciona -- SCROLL me lleva al bottom del component sig            
//             4. revisar que onda con los INDEX como key... no se si deba quedar asi.. leer un poco del tema o ver videos de curso?
//             8. crear un sort de MAYOR A MENOR para los renders de agregados y sort Alfabetico+mayoramenor? para individuales
//             9. crear rendering views para  "cantidad de quejas" VS "cantidad de monto reclamado" --definir si seran componentes que se renderizan ambos (ej arriba quejas abajo montos) o si         seran conditional rendering tmb
//             10. test carga de DB real de profeco desde json/excel
//             12. crear modulo de POST QUEJA y layout UX/UI para definir donde se pondra eso y como nutrira el sitio RELATIVO a la data oficial
//             13. ya deahi..definir q pedo con un test de db real con volu¿men de datos alto y con el deployment (ej medidas de seguridad para DB, IP etc)
//             12. ver auth jtx MERN net ninja??
//             }*/
           
//         