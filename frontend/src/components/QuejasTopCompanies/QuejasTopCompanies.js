import {useState, useEffect} from 'react'
import useFetch from '../../Hooks/useFetch'
import BarChart from '../BarChart/BarChart'
import SumQuejasCompany from '../QuejasFormats/SumQuejasCompany'

const TopCompanies = () => {
    const [topQuejasAllCompanies, setTopQuejasAllCompanies] = useState([])

    const [graphPerCompany, setGraphPerCompany] = useState({
        labels: [],
        datasets: [{
            label: 'Quejas por Empresa',
            data: [],
            backgroundColor: 'blue',
            borderRadius: 5,
       }]})
    const [loading,setLoading]=useState(true)
    const barChartColor = '#1ac6edb0';
    const [topCompanies, setTopCompanies] = useFetch('http://localhost:5000/api/quejas-profeco/topEmpresa')
    useEffect(()=>{
        
        const fetchQuejas = async()=>{
            try{
                // const [topCompanies, setTopCompanies] = useFetch('http://localhost:5000/api/quejas-profeco/topEmpresa')
                // const topCompanies = await fetch('http://localhost:5000/api/quejas-profeco/topEmpresa')
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
        }   
        fetchQuejas()              
    },[])
    
    return ( 
        <div className="containerWrap">
        <div className="data"> 
            <h2 className="datah2">{titleChart}</h2> 
            { loading ?
                <p>Cargando...</p>
             : 
                <BarChart chartData={graphPerCompany}/>     
            }

            <p className="dataP">La gráfica muestra la lista de las 10 empresas que han recibido más quejas ante la Procuraduría Federal del Consumidor (PROFECO) en México durante el período pasado(2022) y lo que va de 2023*</p> 
         
            <h3 className="datah3">Detalles de las Quejas por Empresa</h3> 
            <p className="dataP">Conoce los detalles de las quejas acumuladas por empresa  por ej. el motivo de la queja ante PROFECO, su estátus actual, su valor económico y más:</p> 
                {/* OJO AQUI-- intente key con i, queja.i, queja._id, pero TODAS arrojan el error de Warning: Each child in a list should have a unique "key" prop en HOME, QUEJASCOMPANIESCOMPLETE Y QUEJASSECTORESCOMPLETE  */}
                {topQuejasAllCompanies                       
                    .slice(0,4)
                    .map((queja,i)=>(
                        // <Link to={'/empresa/' + queja.nombreComercialParamUrl}><SumQuejasCompany key={i} queja={queja}/></Link>
                        <SumQuejasCompany key={i} queja={queja}/>
                    ))
                }
        </div>
        </div>
     );
}
 
export default TopCompanies;