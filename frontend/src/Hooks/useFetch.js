import {useState, useEffect} from 'react'
const useFetch = (url) => {

    const [quejas,setQuejas] = useState(null)

    useEffect(()=>{
        const fetchQuejas = async() =>{
            try{
                const fetchQuejas = await fetch(url) 
                const response = await fetchQuejas.json()
                console.log(response)
                if(response.ok){
                    setQuejas(response)
                    return response
                    // throw Error('no se pudo hacer el fetch, el endpoint no existe o la req fue negada')
                }
                // setQuejas(response)
                // return response

            }catch(err){
                console.log(err.message)
            }
        }
        fetchQuejas()
    },[])

    return quejas;
}
 
export default useFetch;