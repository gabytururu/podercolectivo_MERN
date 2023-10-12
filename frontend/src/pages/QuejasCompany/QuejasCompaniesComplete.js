import SumQuejasCompany from "../../components/QuejasFormats/SumQuejasCompany";
import {useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import { QuejasContext } from "../../Context/QuejasContext";
import BarChart from "../../components/BarChart/BarChart";

const QuejasCompaniesComplete = () => {

    // //  FUNCIONA OK EL USE FETCH PERO COMPITE CON USEQUEJAS BY CATEGORY QUE NO RECIBE A TIEMPO Y DEVUELVE NULL -- FUNCIONA OK SI LO MANEJO COMO FETCH DIRECTO OCN USE EFFECT // PERO NO PUEDO USAR USEFETCH DENTRO DE USEEFFECT PORQUE QUEDARIA CONDITIONAL/COMO CALLBACK Y ESO NO LO DEJA HACER CON HOOKS // QUIZA SI VUELVO USEQUEJASBYCATEGORY ASINCRONA??

    const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany,barChartColor, barChartRadius} = useContext(QuejasContext)
    
    useEffect(()=>{
        const fetchQuejas = async()=>{
            try{
                const quejasObject = await fetch('http://localhost:5000/api/quejas-profeco/')
                const quejasJson = await quejasObject.json()
    
                if(quejasObject.ok){
                    setQuejas(quejasJson)
                    const quejasCompany = sumQuejasPerCategory(quejasJson, categoryCompany)
                    setQuejasPerCompany(quejasCompany)
                    setGraphPerCompany({
                        labels: quejasCompany.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=>quejas.nombreComercialCorto).slice(1,20),
                        datasets: [{
                            label: 'Quejas por Empresa',
                            data: quejasCompany.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=> quejas.totalQuejas).slice(1,20),
                            backgroundColor: barChartColor,
                            borderRadius: barChartRadius
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
        <div className="containerWrap" style={{ whiteSpace: 'pre-line' }}>
            <div className="data"> 
                <h1 className="datah1">
                    Empresas con más Quejas Acumuladas ante PROFECO México              
                </h1> 
                 <p className="dataP">La gráfica siguiente presenta la lista de las 50 empresas con más quejas interpuestas ante la PROFECO México,(incluye todos los sectores activos en el país) durante el período 2022 y lo que va de 2023*</p>        
                    <BarChart chartData={graphPerCompany}/>                                
                <h2 className="datah2">Lista detallada de las empresas con más quejas presentadas ante PROFECO México</h2> 
                <p className="dataP">Puedes dar click o tap a cada una para conocer el motivo, estátus, y el ID Oficial de PROFECO de cada una de las quejas acumuladas por cada empresa</p>
                  {/* OJO AQUI-- intente key con i, queja.i, queja._id, pero TODAS arrojan el error de Warning: Each child in a list should have a unique "key" prop en HOME, QUEJASCOMPANIESCOMPLETE Y QUEJASSECTORESCOMPLETE  */}
                {quejasPerCompany
                    .sort((a,b) => b.totalQuejas - a.totalQuejas)
                    .map((queja,i)=>(
                            //<Link to={'/'+ queja.sector+'/'+ queja.company}><SumQuejasCompany key={i} queja={queja}/></Link>
                            <Link to={'/empresa/'+ queja.nombreComercialParamUrl}><SumQuejasCompany key={i} queja={queja}/></Link>
                        ))
                    }
            
            </div>
        </div>
     );
}
 
export default QuejasCompaniesComplete;