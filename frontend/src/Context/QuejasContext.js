import {createContext} from 'react'
import {useState} from 'react'

export const QuejasContext = createContext()
const initialQuejas = null

export const QuejasContextProvider = ({children}) =>{

    // NO HE ACABADO DE ESCRIBIR ESTE CONTEXTO PERO LA INTENCION ES VER SI PUEDO HACER QUE QUEJAS Y  LA LOGICA DE QUEJASBYCATEGORY/QUEJASBYSECTOR SEA UN ESTADO GLOBAL VIA CONTEXTO?? 
    //Para el menu nav quiza aplica un state condicional segun donde clickas... pero para la home que renderiza ambas no se si eso jale... // al final aca lo importante es poder correr el hook useQuejasByCategory en combo con useFetch sin que haya competencia que genere null como esta pasndo ahora... y evitar tambien tener duplicaciones de mismo codigo all over de place

    //ojo aunque ya cree el context provider me falta hacer el llamado de USECONTEXT() Donde sea que lo planee/decida usar... veremos luego si se logra usar como pienso q debeser ... mientras tanto... la app ya funciona sin el contexto
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
            backgroundColor: [
                '#1ac8ed', //blue
                // '#1ac6edb0',
                // '#005494',
                // '#ff6347',
                // '#ffba08',
            ],
       }]}) 

    const sumQuejasPerCategory = (quejas, categorySelected) =>{
        let categoriesArray = []
        quejas && quejas.map( queja => categoriesArray.includes(queja[categorySelected])?'':categoriesArray.push(queja[categorySelected]))
    
        let categoriesAggregatedIndicators = []
        for (let category of categoriesArray){
            let montoReclamado = 0
            let montoRecuperado = 0
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
            const thisElementinCategoryIndicators = {company: category, totalQuejas: quejasQtyThisCategory, montoTotalReclamado: montoReclamado, montoTotalRecuperado: montoRecuperado, sector: sector, costoBienServicio: costoBienServicio, giro:giro}
            categoriesAggregatedIndicators.push(thisElementinCategoryIndicators)
            console.log('categoriesAgg indicators from context function-->',categoriesAggregatedIndicators)
        }
        //console.log(categoriesAggregatedIndicators)
        return categoriesAggregatedIndicators
    }
    // const perCompany = quejasSumPerCategory(quejas,categoryCompany)
    // const perSector = quejasSumPerCategory(quejas,categorySector)
    // const perGiro = quejasSumPerCategory(quejas,categoryGiro)

    const data = {
        quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector
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