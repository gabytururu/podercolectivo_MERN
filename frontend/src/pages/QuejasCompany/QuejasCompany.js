import './QuejasCompany.css'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import AllQuejas from '../../components/QuejasFormats/AllQuejas'

const QuejasCompany = () => {
    
    // const {sector, nombre_comercial} = useParams()
    const {sector, nombreComercial} = useParams()
    const [quejasEmpresa, setQuejasEmpresa] = useState(null)

    useEffect(()=>{
        const getQuejasEmpresa = async() =>{

            //verificar si tiene que ver con el guion bajo del nombre???
            try{
                // const fetchQuejasEmpresa = await fetch(`http://localhost:5000/api/quejas/${sector}/${nombre_comercial}`)
                const fetchQuejasEmpresa = await fetch(`http://localhost:5000/api/quejas/${sector}/${nombreComercial}`)
                const quejasEmpresaJson = await fetchQuejasEmpresa.json()
                console.log(quejasEmpresaJson)
                setQuejasEmpresa(quejasEmpresaJson)
                console.log(quejasEmpresa)

            }catch(err){
                console.log('el error en GET QUEJAS POR EMPRESA -->')
            }

        } 
        getQuejasEmpresa()
    },[])

    return ( 
        <div className="containerWrap">
            {/* <h1>Quejas sobre la empresa "{quejasEmpresa && nombre_comercial}" México del Sector {sector} recibidas en PROFECO</h1> */}
            <h1>Quejas sobre la empresa "{quejasEmpresa && nombreComercial}" México del Sector {sector} recibidas en PROFECO</h1>

            {quejasEmpresa && quejasEmpresa.map((queja)=>(
                <AllQuejas key={queja._id} queja={queja}/>
            ))}


        </div>
     );
}
 
export default QuejasCompany;