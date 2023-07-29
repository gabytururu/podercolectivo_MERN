import SumQuejasCompany from "../../components/QuejasFormats/SumQuejasCompany";
import SumQuejasSector from "../../components/QuejasFormats/SumQuejasSector";
import useQuejasByCategory from "../../Hooks/useQuejasByCategory";
import {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'

const QuejasCompaniesComplete = () => {
    const location = useLocation()
    const [quejas, setQuejas] = useState(location.state.quejas)
    const [categoryByCompanies, setCategoryByCompanies] = useState(location.state.categoryByCompanies)

    console.log("location --->", location)
    console.log("las quejas--->", quejas)
    console.log("las categoriesbyCompany--->", categoryByCompanies)

    const quejasAggregatedByCompanies = useQuejasByCategory(quejas, categoryByCompanies)
    return ( 
        <div className="containerWrap">
            <h1 >
                Aca va la lista ampliada de lAS QUEJAS ACUMULADAS POR COMPAÑIAS             
            </h1>
            <div className="data"> 
                <h2>¿Cuáles son las Empresas con más Quejas en México?</h2> 

                <h2>va la  data</h2>
                {quejas && categoryByCompanies && quejasAggregatedByCompanies && quejasAggregatedByCompanies.map((queja)=>(
                            <Link to={'/'+ queja.sector+'/'+ queja.company}><SumQuejasCompany key={queja._id} queja={queja}/></Link>
                        ))
                    }
            
            </div>
        </div>
     );
}
 
export default QuejasCompaniesComplete;