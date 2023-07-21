import {useState, useEffect} from 'react'
import AllQuejas from '../../../src/components/QuejasFormats/AllQuejas'
import SumQuejasSector from '../../../src/components/QuejasFormats/SumQuejasSector'
import './Home.css'
import {Link} from 'react-router-dom'

const Home = () => {
    const [quejas,setQuejas] = useState(null)
    const [sectores, setSectores] = useState(null)
    useEffect(()=>{
        const fetchQuejas = async()=>{
            try{
                const quejasObject = await fetch('http://localhost:5000/api/quejas/')
                const quejasJson = await quejasObject.json()
    
                if(quejasObject.ok){
                    setQuejas(quejasJson)
                }
            }catch(err){
                console.log('hubo un error: ', err)
            }         
        }
        fetchQuejas()        
    },[])

    
    let quejasSectorArr=[]
    quejas.forEach(queja => quejasSectorArr.includes(queja.sector)?'':quejasSectorArr.push(queja.sector))
    setSectores(quejasSectorArr)


    // const createSectorsArr = (quejas) =>{
    //     quejas.forEach(queja => quejasSectorArr.includes(queja.sector)?'':quejasSectorArr.push(queja.sector) )
    //     console.log(quejasSectorArr)
    // }

    // let resumenQuejasSectorArr = []
    // const createQuejasTotalization =(sector)=>{
    //     let montoReclamado = 0
    //     let montoRecuperado = 0
        
    //     const quejasPerSector = quejas.filter((queja)=> queja.sector === sector)
    //     const quejasTotal = quejasPerSector.length
    //     for(let queja of quejasPerSector){
    //         montoReclamado = queja.montoReclamado + montoReclamado
    //         montoRecuperado = queja.montoRecuperado + montoRecuperado
    //     }

    //     const resumenQuejasSector = {sector: sector, montoReclamadoTotal: montoReclamado, montoRecuperadoTotal: montoRecuperado}
    //     resumenQuejasSectorArr.push(resumenQuejasSector)
    //     console.log(resumenQuejasSector)
    //     console.log(resumenQuejasSectorArr)
    // }

    // for (let sector of quejasSectorArr){
    //     createQuejasTotalization(sector)
    // }
    

    // let quejasCompanysArr=[]
    // const createCompanysArr = (quejas) =>{
    //     quejas.forEach(queja => quejasCompanysArr.includes(queja.nombreComercial)?'':quejasCompanysArr.push(queja.nombreComercial) )
    //     console.log(quejasCompanysArr)
    // }
   


    return ( 
        <div className="containerWrap">
            <div className="backdropImg">
                ACA IRA LA IMAGEN FRONTAL               
            </div>


             <div className="data">  
             <h1>Testeando sintesis</h1>
             {/* <p quejas={quejas}>te paso las quejas</p> */}
             {/* {quejas && quejas.map((queja)=>(
                <SumQuejasSector key={queja._id} queja={queja} createSectorsArr={createSectorsArr(quejas)} createCompanysArr={createCompanysArr(quejas)} createQuejasTotalization={createQuejasTotalization} />
             ))}              */}
             {sectores && sectores.map((sector,i)=>(
                <SumQuejasSector key={i} sectores={sectores} quejas={quejas}/> 
             ))                
             }
                
             </div>   

             <hr></hr>  

            <div className="data">            
                <h2>¿Cuáles son los Sectores con más Quejas en México?</h2> 
                <p>las {quejas&&quejas.length} quejas en total</p>        
                {/* <p>las quejas de kavak son {quejas&&quejas.filter((queja)=>
                    queja.nombreComercial === 'kavak'
                ).length}</p>                */}
                   
             
                    {quejas && quejas.slice(0,15).map((queja)=>(
                            <Link to={'/sector/'+ queja.sector}><AllQuejas key={queja._id} queja={queja}/></Link>
                        ))
                    }
                    <Link className="button" to="/sector/:sector">Ver Más</Link>
            </div> 
                {/* <div className="data">
                    <h2>¿Cuáles son las Empresas con más Quejas en México?</h2>
                    {quejas && quejas.slice(0,5).map((queja)=>(
                                <Link to={"/"+queja.sector+"/"+queja.nombreComercial}><AllQuejas key={queja._id} queja={queja}/></Link>
                                ))}                    
                        <Link className="button" to="/:sector/:nombreComercial">Ver Más</Link>
                </div>                      */}
            </div>
     );
}
 
export default Home;