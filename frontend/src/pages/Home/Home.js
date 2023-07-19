import {useState, useEffect} from 'react'
import AllQuejas from '../../../src/components/QuejasFormats/AllQuejas'
import './Home.css'
import {Link} from 'react-router-dom'

const Home = () => {
    const [quejas,setQuejas] = useState(null)

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

    const handleClick = () =>{
        console.log(this)
    }


    return ( 
        <div className="containerWrap">
            <div className="backdropImg">
                ACA IRA LA IMAGEN FRONTAL               
            </div>
            <div className="data">
                <h2>¿Cuáles son los Sectores con más Quejas en México?</h2>            
                    {quejas && quejas.slice(0,5).map((queja)=>(
                            <AllQuejas key={queja._id} queja={queja}/>
                        ))
                    }
                    <Link className="button" to="/sector/:sector">Ver Más</Link>
              

                <h2>¿Cuáles son las Empresas con más Quejas en México?</h2>
                {quejas && quejas.slice(0,5).map((queja)=>(
                            <AllQuejas key={queja._id} queja={queja}/>
                        ))
                    }
                    <Link className="button" to="/:sector/:nombreComercial">Ver Más</Link>
                
                
            </div>         
        </div>
     );
}
 
export default Home;