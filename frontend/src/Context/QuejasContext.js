import {createContext} from 'react'
import {useState} from 'react'

export const QuejasContext = createContext()
const initialQuejas = null

export const QuejasContextProvider = ({children}) =>{

    // NO HE ACABADO DE ESCRIBIR ESTE CONTEXTO PERO LA INTENSION ES VER SI PUEDO HACER QUE QUEJAS Y  LA LOGICA DE QUEJASBYCATEGORY/QUEJASBYSECTOR SEA UN ESTADO GLOBAL VIA CONTEXTO?? Para el menu nav quiza aplica un state condicional segun donde clickas... pero para la home que renderiza ambas no se si eso jale... // al final aca lo importante es poder correr el hook useQuejasByCategory en combo con useFetch sin que haya competencia que genere null como esta pasndo ahora... y evitar tambien tener duplicaciones de mismo codigo all over de place

    //ojo aunque ya cree el context provider me falta hacer el llamado de USECONTEXT() Donde sea que lo planee/decida usar... veremos luego si se logra usar como pienso q debeser ... mientras tanto... la app ya funciona sin el contexto

    const [quejas, setQuejas] = useState(null)


    const data = {quejas}
    return(
        <QuejasContext.Provider value={data}>
            {children}
        </QuejasContext.Provider>
    )
}

//jonmircha los exporta asi mientras que shaun hace la export nombrada por ahora, mantengo el estilo de shaun
//export {QuejasProvider} 
//export default QuejasContextProvider