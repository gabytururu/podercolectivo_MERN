import {useParams, Link} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import { QuejasContext } from '../../Context/QuejasContext'
import BarChart from '../../components/BarChart/BarChart'
import SumQuejasCompany from '../../components/QuejasFormats/SumQuejasCompany'

const QuejasGiro = () => {

    const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany, graphPerGiro, setGraphPerGiro, barChartColor, barChartRadius} = useContext(QuejasContext)

    const {giro} = useParams()
    const [quejasDelGiro, setQuejasDelGiro ] = useState(null)
    // const [categoryBySector, setCategoryBySector] = useState('sector')

    useEffect(()=>{
        const getQuejasGiro = async() =>{
            try{
                const fetchQuejasGiro = await fetch(`http://localhost:5000/api/quejas/giro/${giro}`)
                const quejasGiroJson = await fetchQuejasGiro.json()
                setQuejasDelGiro(quejasGiroJson)
                const quejasGiro = sumQuejasPerCategory(quejasGiroJson, categoryGiro)
                setGraphPerGiro({
                    labels: quejasGiro.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=>quejas.company),
                    datasets: [{
                        label: 'Quejas por Giro',
                        data: quejasGiro.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=> quejas.totalQuejas),
                        backgroundColor: barChartColor,
                        borderRadius: barChartRadius
                   }]
                })

              
            }catch(err){
                console.log('el error fue-->',err)
            }
        }
        getQuejasGiro()  
    },[])

    
    const getValorBienOServicio =(quejasdelGiro)=>{
        let valorBienServicio = 0
        for(let queja of quejasdelGiro){
            valorBienServicio = valorBienServicio + queja.costo_bien_servicio
        }
        return valorBienServicio
    }

    return ( 
        <div className="containerWrap">
        <div className="data">
            <h1 className="datah1">Quejas Recibidas ante la PROFECO del Giro Comercial {giro}</h1>
            <p className="dataP">Del año 2022 a la fecha han sido interpuestas ante PROFECO un total de {quejasDelGiro && quejasDelGiro.length} quejas por malas prácticas o incumplimientos de las empresas del giro comercial{giro}</p>
            <p className="dataP">Las Quejas de este sector son reclamos por transacciones de bienes o servicios que ascienden a un valor de {quejasDelGiro && getValorBienOServicio(quejasDelGiro)} MXN</p>
                <BarChart chartData={graphPerGiro}/>    
            <h2 className="datah2">Lista Detallada de Quejas Acumuladas por Cada Empresa del giro comercial {giro} </h2>
            <p className="dataP">Da click o tap en cada una para conocer el motivo y estátus de las quejas acumuladas por empresa </p>
                {quejasDelGiro && sumQuejasPerCategory(quejasDelGiro,categoryGiro)
                .sort((a,b)=>b.totalQuejas - a.totalQuejas)
                .map((queja)=>(    
                <Link to={'/'+ queja.giro + '/' + queja.company}>           
                <SumQuejasCompany key={queja._id} queja={queja} /></Link>   
                ))
                } 
        </div>
    </div>
     );
}
 
export default QuejasGiro;