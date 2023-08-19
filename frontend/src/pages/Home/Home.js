import {useState, useEffect} from 'react'
import useQuejasByCategory from '../../Hooks/useQuejasByCategory'
import SumQuejasSector from '../../../src/components/QuejasFormats/SumQuejasSector'
import SumQuejasCompany from '../../../src/components/QuejasFormats/SumQuejasCompany'
import QuejaCard from '../../../src/components/QuejasFormats/QuejaCard'
import './Home.css'
import {Link} from 'react-router-dom'
import BarChart from '../../components/BarChart'
import {UserData} from '../../Data'

const Home = () => {
    const [quejas,setQuejas] = useState(null)
    const [categoryByCompanies, setCategoryByCompanies] = useState('nombreComercial')
    const [categoryBySector, setCategoryBySector] = useState('sector')
    const [category, setCategory] = useState('empresas') // ---> setSCategory('sectores)
   
    useEffect(()=>{
        const fetchQuejas = async()=>{
            try{
                const quejasObject = await fetch('http://localhost:5000/api/quejas/')
                const quejasJson = await quejasObject.json()
    
                if(quejasObject.ok){
                    setQuejas(quejasJson)
                }
            }catch(err){
                console.log('hubo un error: ', err)
            }         
        }
        fetchQuejas()        
    },[])

    const QuejasSumByCompany = useQuejasByCategory(quejas, categoryByCompanies)
    const QuejasSumBySector = useQuejasByCategory(quejas,categoryBySector)

    // const createQuejasByCategory = (quejas, categorySelected) =>{
    //     let categoriesArray = []
    //     quejas && quejas.map( queja => categoriesArray.includes(queja[categorySelected])?'':categoriesArray.push(queja[categorySelected]))

    //     let categoriesAggregatedIndicators = []
    //     for (let category of categoriesArray){
    //         let montoReclamado = 0
    //         let montoRecuperado = 0
    //         let sector = ''
    //         const quejasThisCategory = quejas.filter((queja)=> queja[categorySelected] === category)
    //         const quejasQtyThisCategory = quejasThisCategory.length
    //         for(let queja of quejasThisCategory){
    //             montoReclamado = queja.monto_reclamado + montoReclamado
    //             montoRecuperado = queja.monto_recuperado_b + montoRecuperado
    //             sector = queja.sector
    //         }
    //         const thisElementinCategoryIndicators = {company: category, totalQuejas: quejasQtyThisCategory, montoTotalReclamado: montoReclamado, montoTotalRecuperado: montoRecuperado, sector: sector}
    //         categoriesAggregatedIndicators.push(thisElementinCategoryIndicators)
    //         console.log(categoriesAggregatedIndicators)
    //     }
    //     return categoriesAggregatedIndicators
    // }

    // const createSectorsWithQuejasArr=(quejas)=>{
    //     let quejasSectorArr=[]
    //     quejas && quejas.map(queja => quejasSectorArr.includes(queja.sector)?'':quejasSectorArr.push(queja.sector)) 

    //     let sectorAggregatedIndicatorsArr = []
    //     for (let sector of quejasSectorArr){
    //         let montoReclamado = 0
    //         let montoRecuperado = 0
    //         const quejasThisSector = quejas.filter((queja)=>queja.sector === sector)
    //         const quejasQtyThisSector = quejasThisSector.length
    //         for(let queja of quejasThisSector){
    //             montoReclamado = queja.monto_reclamado + montoReclamado
    //             montoRecuperado = queja.monto_recuperado_b + montoRecuperado
    //         }
    //         const thisSectorIndicators = {sector:sector, totalQuejas: quejasQtyThisSector, montoTotalReclamado: montoReclamado, montoTotalRecuperado: montoRecuperado}
    //         sectorAggregatedIndicatorsArr.push(thisSectorIndicators)
    //         console.log(sectorAggregatedIndicatorsArr)
    //     }
    //     return sectorAggregatedIndicatorsArr
    // }

    // const createCompaniesWithQuejasArr=(quejas)=>{
    //     let quejasCompanyArr=[]
    //     //hace mas sentido con for each o con map?? para que mapeo y creo un nuevo array q no almaceno? q pasa con este? al final toda la logica es para pushear y alterar quejasCompanyArr entonces no se cual es mas correcto
    //     quejas && quejas.map(queja => quejasCompanyArr.includes(queja.nombreComercial)?'':quejasCompanyArr.push(queja.nombreComercial)) 

    //     let companiesAggregatedIndicatorsArr = []
    //     //debiera usar puro map en lugar de for ofs? revisar literatura, me da la impresion de que reactse basa mucho mas en maps pero ...no tengo claro
    //     for (let company of quejasCompanyArr){
    //         let montoReclamado = 0
    //         let montoRecuperado = 0
    //         let sector = ''
    //         const quejasThisCompany = quejas.filter((queja)=>queja.nombreComercial === company)
    //         const quejasQtyThisCompany = quejasThisCompany.length
    //         for(let queja of quejasThisCompany){
    //             montoReclamado = queja.monto_reclamado + montoReclamado
    //             montoRecuperado = queja.monto_recuperado_b + montoRecuperado
    //             sector = queja.sector
    //         }
    //         const thisCompanyIndicators = {company: company, totalQuejas: quejasQtyThisCompany, montoTotalReclamado: montoReclamado, montoTotalRecuperado: montoRecuperado, sectorCompany: sector}
    //         companiesAggregatedIndicatorsArr.push(thisCompanyIndicators)
    //         console.log(companiesAggregatedIndicatorsArr)
    //     }
    //     return companiesAggregatedIndicatorsArr
    // }
    // categoriesAggregatedIndicatorsBySector&&  console.log(categoriesAggregatedIndicatorsBySector)
    // categoriesAggregatedIndicatorsByCompany && console.log(categoriesAggregatedIndicatorsByCompany)


    //fyi tutorial ->https://www.youtube.com/watch?v=RF57yDglDfE
    // documentation: https://www.chartjs.org/docs/latest/
    console.log('QuejasSumbyCompany', QuejasSumByCompany)
    console.log('QuejasSumbySector', QuejasSumBySector)

    const [quejasBySectorGraph, setQuejasBySectorGraph] = useState({
        labels: QuejasSumBySector.map((sector)=>sector.company),
        datasets:[{
            label:'total Quejas',
            data: QuejasSumBySector.map((sector)=> sector.totalQuejas)
        }]
    })
    const [userData, setUserData] = useState({
        labels: UserData.map((data)=> data.year),
        datasets: [{
            label: 'Users Gained',
            data: UserData.map((data)=> data.userGain),
            backgroundColor: [
                '#1ac8ed', //red
                '#1ac6edb0',
                '#005494',
                '#ff6347',
                '#ffba08',
            ],
            borderColor:'#000000',
            borderWidth:5
        }]
    })
    return ( 
        <div className="containerWrap">
            <div className="backdropImg">
            
                    {/* <BarChart chartData={quejasBySectorGraph}/>  */}
                    <BarChart chartData={userData}/> 
                   
                
                                      
            </div>
            <div className="data"> 
                <h2>¿Cuáles son los Sectores con más Quejas en México?</h2> 
                    {/* {quejas && createSectorsWithQuejasArr(quejas).map((queja)=>( */}
                    {/* {quejas && createQuejasByCategory(quejas,categoryBySector).map((queja)=>( */}
                    {quejas && QuejasSumBySector &&QuejasSumBySector.map((queja)=>(
                            <Link to={'/sector/'+ queja.sector}><SumQuejasSector key={queja._id} queja={queja}/></Link>
                        ))
                    }
                {/* <Link className="button" to={'/sectores'} quejas={quejas} createCompaniesWithQuejasArr={createSectorsWithQuejasArr}>Ver Más</Link> */}
                <Link className="button" to={'/sectores'} state={categoryBySector && {quejas:quejas, categoryBySector:categoryBySector }}>Ver Más</Link>
            </div>
            <div className="data"> 
                <h2>¿Cuáles son las Empresas con más Quejas en México?</h2> 
                    {/* {quejas && createCompaniesWithQuejasArr(quejas).map((queja)=>( */}
                    {/* {quejas && createQuejasByCategory(quejas, categoryByCompanies).map((queja)=>( */}

                    {/* OJO AQUI-- intente key con i, queja.i, queja._id, pero TODAS arrojan el error de Warning: Each child in a list should have a unique "key" prop en HOME, QUEJASCOMPANIESCOMPLETE Y QUEJASSECTORESCOMPLETE  */}
                    {quejas && QuejasSumByCompany && QuejasSumByCompany.map((queja,i)=>(
                            <Link to={'/'+ queja.sector + '/' + queja.company}><SumQuejasCompany key={i} queja={queja}/></Link>
                        ))
                    }
                <Link className="button" to="/empresas" state={categoryByCompanies && {quejas:quejas, categoryByCompanies:categoryByCompanies}}>Ver Más</Link>
            </div>
        </div>
            );
}
export default Home;     
// {/* {/* 
//             {/* Pendientes: 
                // 0. para arreglar el prob del scroll atuomatico al bottom via LINKS --> https://www.kindacode.com/article/react-router-dom-scroll-to-top-on-route-change/
//             1. estilo - estilizar correctamente
//             XXX DONE XXXX 2. agregar sector correspondiente al agregado de compañias -- para que pueda posteriormente usarse como param del LINK
//             XXX DONE XXX 3. corregir los links para que al hacer click lleve al route correcto / deseado
                //XXX DONE XXX 3.b arreglar los routes para usar los indicadores agregados en view secundaria*post home previa a la del detalle por compania
//             4. revisar que onda con los INDEX como key... no se si deba quedar asi.. leer un poco del tema o ver videos de curso?
//             5.  definir si conviene tener la logica de estas funciones createCompaniesWithQuejasArr() y sectorsArr() desde HOME y mapear componentes sencillos, o si conviene mas pasar el array completo de quejas al componente hijo y hacer alla la logica de estas funciones ??
//             6. verificar la posibilidad de integrar SumQuejasCompany y SumQuejasSector en un solo componente que opere con conditional rendering asociado a un estado que se pase desde Home eg. [renderperSector, setRenderperSector] = true / [renderperCompany, setRenderPerCompany] =false
//             7. corregir las rutas vinculadas a los botones de "VER MAS" eg. ver todos los sectores, eg. ver todas las Empresas
//             8. crear un sort de MAYOR A MENOR para los renders de agregados y sort Alfabetico+mayoramenor? para individuales
//             9. crear rendering views para  "cantidad de quejas" VS "cantidad de monto reclamado" --definir si seran componentes que se renderizan ambos (ej arriba quejas abajo montos) o si seran conditional rendering tmb
//             10. test carga de DB real de profeco desde json/excel
//             11. aprender D3 O LIBRERIA EQUIVALENTE 
//             12. crear modulo de POSTER QUEJA y layout UX/UI para definir donde se pondra eso y como nutrira el sitio RELATIVO a la data oficial
//             13. ya deahi..definir q pedo con un test de db real con volu¿men de datos alto y con el deployment (ej medidas de seguridad para DB, IP etc)
//             12. ver auth jtx MERN net ninja??
//             }*/
           
//             // {
//             //         quejas && createSectorsWithQuejasArr(quejas).map((queja)=>(
//             //             <div className="queja">
//             //                 <h3>Sector:</h3><p>{queja.sector}</p>
//             //                 <h3>Cantidad de Quejas</h3><p>{queja.totalQuejas}</p>
//             //                 <h3>Monto total Reclamado</h3><p>${queja.montoTotalReclamado}</p>
//             //                 <h3>Monto Recuperado</h3><p>${queja.montoTotalRecuperado}</p>
//             //             </div>
//             //         ))
//             //     } 
         
//             {/* <hr></hr>
//             <div className="data">
//                 <h1>Testeando desde la funcion COMPAÑIA</h1>
//                 {
//                 quejas && createCompaniesWithQuejasArr(quejas).map((queja)=>(
//                     <div>
//                         <h3>Empresa:</h3><p>{queja.company}</p>
//                         <h3>Cantidad de Quejas</h3><p>{queja.totalQuejas}</p>
//                         <h3>Monto total Reclamado</h3><p>${queja.montoTotalReclamado}</p>
//                         <h3>Monto Recuperado</h3><p>${queja.montoTotalRecuperado}</p>
//                     </div>

//                 ))
//                 }
//             </div>   */}
  

      

//              {/* <hr></hr>   */}
// {/* 
//             <div className="data">            
//                 <h2>¿Cuáles son los Sectores con más Quejas en México?</h2> 
//                 <p>las {quejas&&quejas.length} quejas en total</p>        
//                 {/* <p>las quejas de kavak son {quejas&&quejas.filter((queja)=>
//                     queja.nombreComercial === 'kavak'
//                 ).length}</p>                */}
                   
// {/*              
//                     {quejas && quejas.slice(0,15).map((queja)=>(
//                             <Link to={'/sector/'+ queja.sector}><AllQuejas key={queja._id} queja={queja}/></Link>
//                         ))
//                     }
//                     <Link className="button" to="/sector/:sector">Ver Más</Link>
//             </div>  */} */}
//                 {/* <div className="data">
//                     <h2>¿Cuáles son las Empresas con más Quejas en México?</h2>
//                     {quejas && quejas.slice(0,5).map((queja)=>(
//                                 <Link to={"/"+queja.sector+"/"+queja.nombreComercial}><AllQuejas key={queja._id} queja={queja}/></Link>
//                                 ))}                    
//                         <Link className="button" to="/:sector/:nombreComercial">Ver Más</Link>
//                 </div>                      */}
//             </div> */}

 
