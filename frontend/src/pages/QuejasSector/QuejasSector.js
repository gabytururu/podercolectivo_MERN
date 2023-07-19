import {useParams} from 'react-router-dom'
import {useState} from 'react'
import {useFetch} from '../Hooks/useFetch'

const QuejasSector = () => {
    const {id,sector,nombreComercial} = useParams()
    //const [quejasSector, setQuejasSector ] = useState(null)

    const {quejasSector} = useFetch(`http://localhost:5000/api/quejas/sector/${sector}`)
    
    // const getQuejasSector = async() =>{
    //     const fetchQuejasSector = await fetch(`http://localhost:5000/api/quejas/sector/${sector}`)

    //     const quejasSector = await fetchQuejasSector.json()
    //     console.log(quejasSector)
    //     setQuejasSector(quejasSector)
    // }
    //creates an infinite loop
    //getQuejasSector()
    return ( 
        <div>
            <h1>ACA IRA EL LAY OUT DE QUEJAS POR SECTOR: {sector}</h1>

            {quejasSector && quejasSector.map((queja)=>(
                            <div key={queja._id}>
                                <p>{nombreComercial}</p>
                                <p>{queja.id}</p>
                            </div>
                        ))
            }
        </div>
     );
}
 
export default QuejasSector;