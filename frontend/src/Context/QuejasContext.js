import {createContext} from 'react'
import {useState} from 'react'

export const QuejasContext = createContext()
const initialQuejas = null

export const QuejasContextProvider = ({children}) =>{

    const barChartColor = '#1ac6edb0';
    const barChartColorB = '#ff63479f';
    const barChartColorC = '#ffb9087e';
    const barChartColorD = '#005494';
    const barChartColorE = '##ff6347';

    const barChartRadius = 5
    
    const [quejas, setQuejas] = useState(null)
    const [categoryCompany, setCategoryCompany] = useState('nombreComercial')
    const [categorySector, setCategorySector] = useState('sector')
    const [categoryGiro, setCategoryGiro] = useState('giro')
    const [quejasPerCompany, setQuejasPerCompany] = useState([])
    const [quejasPerSector, setQuejasPerSector] = useState([])
    const [quejasPerGiro, setQuejasPerGiro] = useState([])
    const [graphPerSector, setGraphPerSector] = useState({
        labels: [],
        datasets: [{
            label: 'Quejas por Sector',
            data: [],
            backgroundColor:barChartColor,
            borderRadius:barChartRadius,
       }]}) 
    const [graphPerCompany, setGraphPerCompany] = useState({
        labels: [],
        datasets: [{
            label: 'Quejas por Empresa',
            data: [],
            backgroundColor: barChartColor,
            borderRadius:barChartRadius,
       }]}) 
    const [graphPerGiro, setGraphPerGiro] = useState({
        labels: [],
        datasets: [{
            label: 'Quejas por Giro Comercial',
            data: [],
            backgroundColor: barChartColor,
            borderRadius:barChartRadius,
        }]
    }) 
    const [graphPerStatus, setGraphPerStatus] = useState({
        labels: [],
        datasets: [{
            label: 'Quejas por Estatus',
            data: [],
            backgroundColor: barChartColor,
        }]
    }) 
    const [graphPerMotivos, setGraphPerMotivos] = useState({
        labels: [],
        datasets: [{
            label: 'Motivos principales de las Quejas',
            data: [],
            backgroundColor: barChartColor,
       }]}) 

    const sumQuejasPerCategory = (quejas, categorySelected) =>{
        let categoriesArray = []
        quejas && quejas.map( queja => categoriesArray.includes(queja[categorySelected])?'':categoriesArray.push(queja[categorySelected]))
    
        let categoriesAggregatedIndicators = []
        for (let category of categoriesArray){
            let montoReclamado = 0
                // montoReclamado.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0, maximumFractionDigits: 0,});
            let montoRecuperado = 0
                // montoRecuperado.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0, maximumFractionDigits: 0,});
            let costoBienServicio = 0
            let sector = ''
            let giro = ''
            const quejasThisCategory = quejas.filter((queja)=> queja[categorySelected] === category)
            const quejasQtyThisCategory = quejasThisCategory.length
            for(let queja of quejasThisCategory){
                montoReclamado = queja.monto_reclamado + montoReclamado
                montoRecuperado = queja.monto_recuperado_b + montoRecuperado
                costoBienServicio = queja.costo_bien_servicio + costoBienServicio
                sector = queja.sector
                giro = queja.giro
            }
            const thisElementinCategoryIndicators = {
                company: category, 
                totalQuejas: quejasQtyThisCategory, 
                montoTotalReclamado: montoReclamado, 
                montoTotalRecuperado: montoRecuperado, 
                sector: sector, 
                costoBienServicio: costoBienServicio.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0, maximumFractionDigits: 0,}), 
                giro:giro
            }
            categoriesAggregatedIndicators.push(thisElementinCategoryIndicators)
            console.log('categoriesAgg indicators from context function-->',categoriesAggregatedIndicators)
        }
        console.log(categoriesAggregatedIndicators)
        return categoriesAggregatedIndicators
    }
    const getStatus =(quejasEmpresa)=>{
        let totalQtyQuejasThisEmpresa = quejasEmpresa.length
        let statusArr =[]
        quejasEmpresa.map(queja => statusArr.includes(queja.estado_procesal)?'':statusArr.push(queja.estado_procesal))
        let statusDetailsAggregator = []
        for(let status of statusArr){        
            const quejasEsteStatus = quejasEmpresa.filter((el)=> el.estado_procesal === status)
            console.log('quejas este status -->filter function-->',quejasEsteStatus)
            const thisStatusDetails ={
                statusName : status,
                qtyQuejasThisStatus : quejasEsteStatus.length,
                percentageThisStatusFromTotal: quejasEsteStatus.length / totalQtyQuejasThisEmpresa
            }
            statusDetailsAggregator.push(thisStatusDetails)
       }
       console.log('result getStatus()--> ',statusDetailsAggregator)
       return statusDetailsAggregator
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

    // const perCompany = quejasSumPerCategory(quejas,categoryCompany)
    // const perSector = quejasSumPerCategory(quejas,categorySector)
    // const perGiro = quejasSumPerCategory(quejas,categoryGiro)

    const data = {
        quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany, graphPerGiro, setGraphPerGiro, barChartRadius, barChartColor,barChartColorB,barChartColorC,barChartColorD,barChartColorE, graphPerStatus, setGraphPerStatus, getStatus, getMotivos, graphPerMotivos, setGraphPerMotivos
    }
    
    
    return(
        <QuejasContext.Provider value={data}>
            {children}
        </QuejasContext.Provider>
    )
}

//jonmircha los exporta asi mientras que shaun hace la export nombrada por ahora, mantengo el estilo de shaun
//export {QuejasProvider} 
//export default QuejasContextProvider