import SumQuejasCompany from "../../components/QuejasFormats/SumQuejasCompany";
import SumQuejasSector from "../../components/QuejasFormats/SumQuejasSector";
import useQuejasByCategory from "../../Hooks/useQuejasByCategory";
import {useState, useEffect, useContext} from 'react'
import {Link, useLocation} from 'react-router-dom'
import useFetch from "../../Hooks/useFetch";
import { QuejasContext } from "../../Context/QuejasContext";
import BarChart from "../../components/BarChart";

const QuejasCompaniesComplete = () => {

    // //  FUNCIONA OK EL USE FETCH PERO COMPITE CON USEQUEJAS BY CATEGORY QUE NO RECIBE A TIEMPO Y DEVUELVE NULL -- FUNCIONA OK SI LO MANEJO COMO FETCH DIRECTO OCN USE EFFECT // PERO NO PUEDO USAR USEFETCH DENTRO DE USEEFFECT PORQUE QUEDARIA CONDITIONAL/COMO CALLBACK Y ESO NO LO DEJA HACER CON HOOKS // QUIZA SI VUELVO USEQUEJASBYCATEGORY ASINCRONA??

    const {quejas, setQuejas, categoryCompany, categorySector, categoryGiro, quejasPerCompany, setQuejasPerCompany, quejasPerSector, setQuejasPerSector, quejasPerGiro, setQuejasPerGiro, sumQuejasPerCategory, graphPerSector, setGraphPerSector, graphPerCompany, setGraphPerCompany} = useContext(QuejasContext)
    
    useEffect(()=>{
        const fetchQuejas = async()=>{
            try{
                const quejasObject = await fetch('http://localhost:5000/api/quejas/')
                const quejasJson = await quejasObject.json()
    
                if(quejasObject.ok){
                    setQuejas(quejasJson)
                    const quejasCompany = sumQuejasPerCategory(quejasJson, categoryCompany)
                    setQuejasPerCompany(quejasCompany)
                    setGraphPerCompany({
                        labels: quejasCompany.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=>quejas.company),
                        datasets: [{
                            label: 'Quejas por Empresa',
                            data: quejasCompany.sort((a,b)=>b.totalQuejas - a.totalQuejas).map((quejas)=> quejas.totalQuejas),
                            backgroundColor: [
                                '#1ac8ed', //blue
                                // '#1ac6edb0',
                                // '#005494',
                                // '#ff6347',
                                // '#ffba08',
                            ],
                            borderColor:'#000000',
                            borderWidth:2
                       }]
                    })                       
                }
            }catch(err){
                console.log('hubo un error: ', err)
            }         
        }
        fetchQuejas()        
      
    },[])  
    
    return ( 
        <div className="containerWrap">
            <h1 >
                Aca va la lista ampliada de lAS QUEJAS ACUMULADAS POR COMPAÑIAS             
            </h1>
            <div className="barChart">  
                    <BarChart chartData={graphPerCompany}/>                                            
            </div>
            <div className="data"> 
                <h2>¿Cuáles son las Empresas con más Quejas en México?</h2> 

                <h2>va la  data</h2>
                  {/* OJO AQUI-- intente key con i, queja.i, queja._id, pero TODAS arrojan el error de Warning: Each child in a list should have a unique "key" prop en HOME, QUEJASCOMPANIESCOMPLETE Y QUEJASSECTORESCOMPLETE  */}
                {quejasPerCompany
                    .sort((a,b) => b.totalQuejas - a.totalQuejas)
                    .map((queja,i)=>(
                            <Link to={'/'+ queja.sector+'/'+ queja.company}><SumQuejasCompany key={i} queja={queja}/></Link>
                        ))
                    }
            
            </div>
        </div>
     );
}
 
export default QuejasCompaniesComplete;