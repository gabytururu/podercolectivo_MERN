import {useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { QuejasContext } from '../../Context/QuejasContext';
import BarChart from '../../components/BarChart/BarChart';
import SumQuejasGiro from '../../components/QuejasFormats/SumQuejasGiro';

const QuejasGiroComplete = () => {
    const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, graphPerGiro, setGraphPerGiro,setGraphPerCompany,barChartColor, barChartRadius} = useContext(QuejasContext)

    useEffect(()=>{
        const fetchQuejas = async()=>{
            try{
                const quejasObject = await fetch('http://localhost:5000/api/quejas-profeco/')
                const quejasJson = await quejasObject.json()

                if(quejasObject.ok){
                    setQuejas(quejasJson)
                    const quejasGiro= sumQuejasPerCategory(quejasJson, categoryGiro)
                    console.log('las quejas por giro--->',quejasGiro)
                    setQuejasPerGiro(quejasGiro)
                    setGraphPerGiro({
                        labels:quejasGiro.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=>quejas.company),
                        datasets:[{
                            label:'Quejas por Giro Comercial',
                            data: quejasGiro.sort((a,b)=>b.totalQuejas-a.totalQuejas).map((quejas)=> quejas.totalQuejas),
                            backgroundColor: barChartColor,
                            borderRadius: barChartRadius
                        }]
                    })
                }
            }catch(err){
                console.log('hubo un error con el fetch de Giro: ', err)
            }
        }
        fetchQuejas()
    },[])

    return (  
        <div className="containerWrap" style={{ whiteSpace: 'pre-line' }}>
            <div className="data"> 
                <h1 className="datah1">
                    Giros Comerciales con más Quejas Acumuladas ante PROFECO México
                </h1>
                <p className="dataP">La gráfica siguiente presenta la lista de los 50 Giros Comerciales con más quejas interpuestas ante la PROFECO México, durante el período 2022 y lo que va de 2023*</p>
                    <BarChart chartData={graphPerGiro}/>                                         
                <h2 className="datah2">Lista detallada de los Giros Comerciales con más quejas presentadas ante PROFECO México</h2>                
                <p className="dataP">Puedes dar click o tap a cada una para conocer detalles de las empresas con quejas que forman parte de este Giro Comercial</p>
                  {/* OJO AQUI-- intente key con i, queja.i, queja._id, pero TODAS arrojan el error de Warning: Each child in a list should have a unique "key" prop en HOME, QUEJASCOMPANIESCOMPLETE Y QUEJASSECTORESCOMPLETE  */}
                {quejasPerGiro
                        .sort((a,b)=>b.totalQuejas - a.totalQuejas)
                        .map((queja,i)=>(
                            <Link to={'/giro/'+ queja.giroParamUrl}><SumQuejasGiro key={i} queja={queja}/></Link>
                        ))
                    }
            
            </div>
        </div>

    );
}
 
export default QuejasGiroComplete;