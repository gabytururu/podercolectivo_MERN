
import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import QuejaCard from '../../components/QuejasFormats/QuejaCard'
import BarChart from '../../components/BarChart/BarChart'
import { QuejasContext } from '../../Context/QuejasContext'
import PieChart from '../../components/PieChart/PieChart'


const QuejasCompany = () => {

    const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany, graphPerStatus, setGraphPerStatus, graphPerMotivos, setGraphPerMotivos, barChartColor,barChartRadiusgetStatus, getStatus} = useContext(QuejasContext)
    
    // const {sector, nombre_comercial} = useParams()
    const {sector, nombreComercial} = useParams()
    const [quejasEmpresa, setQuejasEmpresa] = useState(null)
    
    const [statusChartData, setStatusChartData] = useState(null)

     
    
    // const data = {
    //         labels:['one','two','three'],
    //         datasets:[{
    //                 data:[3,6,9],
    //                 backgroundColor: ['aqua', 'bloodorange','purple']
    //             }]
    //         }

    useEffect(()=>{
        const getQuejasEmpresa = async() =>{
            try{
                
                const fetchQuejasEmpresa = await fetch(`http://localhost:5000/api/quejas/${sector}/${nombreComercial}`)
                const quejasEmpresaJson = await fetchQuejasEmpresa.json()

                if(fetchQuejasEmpresa.ok){
                    setQuejasEmpresa(quejasEmpresaJson) 
                    const infoStatus = getStatus(quejasEmpresa)
                    setStatusChartData(infoStatus)
                    setGraphPerStatus({
                        labels: statusChartData?.map((status)=>status.statusName),
                        datasets:[{
                            label: 'Quejas por Estatus',
                            data:statusChartData?.map((status)=> status.percentageThisStatusFromTotal)
                        }]
                    })
                }

                
            }catch(err){
                console.log('el error en GET QUEJAS POR EMPRESA -->')
            }

        } 
        getQuejasEmpresa()
    },[])



    const getValorBienOServicio = (quejasEmpresa) =>{
        let valorBienServicio = 0
        for(let queja of quejasEmpresa){
            valorBienServicio = valorBienServicio + queja.costo_bien_servicio
        }
        return valorBienServicio.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0, maximumFractionDigits: 0,})
    }


    const getMotivos = (quejasEmpresa)=>{
        let motivosArr=[]
        let totalQtyQuejasThisEmpresa = quejasEmpresa.length
        quejasEmpresa.map(queja=>motivosArr.includes(queja.motivo_reclamacion)?'':motivosArr.push(queja.motivo_reclamacion))
        let motivosDetailsAggregator=[]
        for(let motivo of motivosArr){
            const quejasForThisMotivo = quejasEmpresa.filter((el)=>el.motivo_reclamacion === motivo)

            const thisMotivoDetails ={
                motivoName : motivo,
                qtyThisMotivo : quejasForThisMotivo.length,
                percentageThisMotivo : quejasForThisMotivo.length/totalQtyQuejasThisEmpresa
            }

            motivosDetailsAggregator.push(thisMotivoDetails)
        }
        console.log('motivosDetailsAggregator',motivosDetailsAggregator)
        return motivosDetailsAggregator
    }

    return ( 
        <div className="containerWrap">
           
            <div className="data">   
                <h1 className="datah1">Quejas Detalladas de la Empresa "{quejasEmpresa && nombreComercial}" Recibidas en la PROFECO</h1>
                <p className="dataP">Existen un total de total de <b>{quejasEmpresa && quejasEmpresa.length} quejas de {nombreComercial}</b> interpuestas ante PROFECO. El valor total de los bienes o servicios vinculados a estas quejas asciende a <b>{quejasEmpresa&& getValorBienOServicio(quejasEmpresa)} MXN</b></p>
            </div>
            <div className="infoGraphic">
                <div className="info">
                    <h2>Cantidad Total de las Quejas de {'\n'} {nombreComercial}</h2>  
                    <p className="qtyContainer">
                        {quejasEmpresa && quejasEmpresa.length}                  
                    </p>               
                </div>
                <div className="info">
                    <h2>Valor Total de las Quejas de {nombreComercial}</h2>
                    <p id="value">{quejasEmpresa&& getValorBienOServicio(quejasEmpresa)}</p>
                    <p><small>*Valor en MXN</small></p>
                </div>
                <div className="info">
                    <h2>Estátus de las Quejas de {nombreComercial}</h2>
                    {quejasEmpresa && getStatus(quejasEmpresa)
                        .map((queja,i)=>(
                            <li key={i}>{queja.statusName}={queja.percentageThisStatusFromTotal.toFixed(2)*100}%</li>
                        ))
                    }
                    
                    <PieChart data={graphPerStatus}/>
                    {/* <BarChart chartData={graphPerCompany}/> */}
                </div>
                <div className="info">
                    <h2>Motivos de las Quejas de {nombreComercial}</h2>
                    { quejasEmpresa && getMotivos(quejasEmpresa)
                        .map((queja,i)=>(
                            <li key={i}>{queja.motivoName} = {queja.percentageThisMotivo.toFixed(2)*100}%</li>
                        ))
                    }
                </div>
            </div>
            <div className="data">            
                <h2 className="datah2">Lista Detallada de Quejas de {nombreComercial} presentadas ante PROFECO:</h2>
                <p className="dataP">La siguiente lista, presenta de manera detallada las quejas que han sido sometidas ante PROFECO reclamando una mala práctica, incumplimiento o negativa por parte de {nombreComercial}.</p>
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