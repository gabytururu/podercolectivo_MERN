import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import AllQuejas from '../../components/QuejasFormats/AllQuejas'

const QuejasCompany = () => {
    
    const {sector, nombreComercial} = useParams()
    const [quejasEmpresa, setQuejasEmpresa] = useState(null)

    useEffect(()=>{
        const getQuejasEmpresa = async() =>{
            try{
                const fetchQuejasEmpresa = await fetch(`http://localhost:5000/api/quejas/${sector}/${nombreComercial}`)
                const quejasEmpresaJson = await fetchQuejasEmpresa.json()
                setQuejasEmpresa(quejasEmpresaJson)

            }catch(err){
                console.log('el error en GETQuejasEmpresa -->')
            }

        } 
        getQuejasEmpresa()
    },[])

    return ( 
        <div>
            <h1>Quejas sobre {nombreComercial} México del Sector {sector} recibidas en PROFECO</h1>

            {quejasEmpresa && quejasEmpresa.map((queja)=>(
                <AllQuejas key={queja._id} queja={queja}/>
            ))}


        </div>
     );
}
 
export default QuejasCompany;