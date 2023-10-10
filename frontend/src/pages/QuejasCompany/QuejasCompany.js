
import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import QuejaCard from '../../components/QuejasFormats/QuejaCard'
import BarChart from '../../components/BarChart/BarChart'
import { QuejasContext } from '../../Context/QuejasContext'
import PieChart from '../../components/PieChart/PieChart'


const QuejasCompany = () => {

    const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany, graphPerStatus, setGraphPerStatus, graphPerMotivos, setGraphPerMotivos, barChartColor,barChartColorB,barChartColorC,barChartColorD,barChartColorE,barChartRadiusgetStatus, getStatus, getMotivos} = useContext(QuejasContext)
    
    // const {sector, nombre_comercial} = useParams()
    //const {sector, nombreComercial, nombreComercialParamUrl} = useParams()
    const {nombreComercialParamUrl} = useParams()
    const [quejasEmpresa, setQuejasEmpresa] = useState(null)
    

    useEffect(()=>{
        const getQuejasEmpresa = async() =>{
            try{
                
                const fetchQuejasEmpresa = await fetch(`http://localhost:5000/api/quejas-profeco/empresa/${nombreComercialParamUrl}`)
                const quejasEmpresaJson = await fetchQuejasEmpresa.json()

                if(fetchQuejasEmpresa.ok){
                    setQuejasEmpresa(quejasEmpresaJson) 
                    const infoStatus = getStatus(quejasEmpresaJson)
                    const infoMotivos = getMotivos(quejasEmpresaJson)

                    setGraphPerStatus({
                        labels: infoStatus.map((status)=>status.statusName),
                        datasets:[{
                            label: 'Quejas por Estatus',
                            data: infoStatus && infoStatus.map((status)=> status.percentageThisStatusFromTotal.toFixed(2)*100)
                        }],
                        backgroundColor: [barChartColor,barChartColorB,barChartColorC, barChartColorD, barChartColorE]
                    })

                    setGraphPerMotivos({
                        labels:infoMotivos.map((motivo)=>motivo.motivoName),
                        datasets:[{
                            label:'Quejas por Motivo',
                            data: infoMotivos && infoMotivos.map((motivo)=>motivo.percentageThisMotivo.toFixed(2)*100),
                            backgroundColor: [barChartColor,barChartColorB,barChartColorC, barChartColorD, barChartColorE]
                        }]
                    })
                          
                }

                
            }catch(err){
                console.log('el error en GET QUEJAS POR EMPRESA -->', err)
            }

        } 
        getQuejasEmpresa()
    },[])

    // useEffect(() => {
    //     console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<< GRAPH PER STATUS SEGUNDO USE EFFECT >>>>>>>>>>>>>>>>>>>>>>>>', graphPerStatus);
    // }, [graphPerStatus]);



    const getValorBienOServicio = (quejasEmpresa) =>{
        let valorBienServicio = 0
        for(let queja of quejasEmpresa){
            valorBienServicio = valorBienServicio + queja.costo_bien_servicio
        }
        return valorBienServicio.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0, maximumFractionDigits: 0,})
    }



    return ( 
        <div className="containerWrap">
           
            <div className="data">   
                <h1 className="datah1">Quejas Detalladas de la Empresa "{quejasEmpresa && nombreComercialParamUrl}" Recibidas en la PROFECO</h1>
                <p className="dataP">Existen un total de total de <b>{quejasEmpresa && quejasEmpresa.length} quejas de {nombreComercialParamUrl}</b> interpuestas ante PROFECO. El valor total de los bienes o servicios vinculados a estas quejas asciende a <b>{quejasEmpresa&& getValorBienOServicio(quejasEmpresa)} MXN</b></p>
            </div>
            <div className="infoGraphic">
                <div className="info">
                    <h2>Cantidad Total de las Quejas de {'\n'} {nombreComercialParamUrl}</h2>  
                    <p className="qtyContainer">
                        {quejasEmpresa && quejasEmpresa.length}                  
                    </p>               
                </div>
                <div className="info">
                    <h2>Valor Total de las Quejas de {nombreComercialParamUrl}</h2>
                    <p id="value">{quejasEmpresa&& getValorBienOServicio(quejasEmpresa)}</p>
                    <p><small>*Valor en MXN</small></p>
                </div>
                <div className="info">
                    <h2>Estátus de las Quejas de {nombreComercialParamUrl}</h2>                 
                            <PieChart chartData={graphPerStatus}/>
                    {/* {quejasEmpresa && getStatus(quejasEmpresa)
                        .map((queja,i)=>(
                            <li key={i}>{queja.statusName}={queja.percentageThisStatusFromTotal.toFixed(2)*100}%</li>
                        ))
                    } */}
                    
                 
                    {/* <BarChart chartData={graphPerCompany}/> */}
                </div>
                <div className="info">
                    <h2>Motivos de las Quejas de {nombreComercialParamUrl}</h2>
                    <PieChart chartData={graphPerMotivos}/>
                    {/* { quejasEmpresa && getMotivos(quejasEmpresa)
                        .map((queja,i)=>(
                            <li key={i}>{queja.motivoName} = {queja.percentageThisMotivo.toFixed(2)*100}%</li>
                        ))
                    } */}
                </div>
            </div>
            <div className="data">            
                <h2 className="datah2">Lista Detallada de Quejas de {nombreComercialParamUrl} presentadas ante PROFECO:</h2>
                <p className="dataP">La siguiente lista, presenta de manera detallada las quejas que han sido sometidas ante PROFECO reclamando una mala práctica, incumplimiento o negativa por parte de {nombreComercialParamUrl}.</p>
                <p className="dataP">Cada una de estas quejas cuenta con un ID oficial de PROFECO, así como el motivo por el cual fué presentada la queja, el costo del bien o servicio reclamado y el estátus de la queja (por ej. conciliada, en trámite, desistida etc).</p>
                {quejasEmpresa && quejasEmpresa
                    .sort((a,b)=>b.totalQuejas - a.totalQuejas)
                    .map((queja)=>(
                    <QuejaCard key={queja._id} queja={queja}/>
                ))}
                <p className="dataP">Toda la información presentada en estas fichas ha sido recabada de fuentes oficiales, públicas, y gubernamentales de México y posteriormente procesada por nuestro equipo para crear una  visualización más sencilla y accesible al público en general.</p>
            </div> 

        </div>
     );
}
 
export default QuejasCompany;