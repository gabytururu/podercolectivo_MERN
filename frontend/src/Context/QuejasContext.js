import {createContext} from 'react'
import {useState} from 'react'

export const QuejasContext = createContext()
const initialQuejas = null

export const QuejasContextProvider = ({children}) =>{

    const barChartColor = '#1ac6edb0';
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
    // const perCompany = quejasSumPerCategory(quejas,categoryCompany)
    // const perSector = quejasSumPerCategory(quejas,categorySector)
    // const perGiro = quejasSumPerCategory(quejas,categoryGiro)

    const data = {
        quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany, graphPerGiro, setGraphPerGiro, barChartRadius, barChartColor
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