
const SumQuejasSector = ({queja}) => {   
    
    const {sector, totalQuejas, montoTotalReclamado, montoTotalRecuperado} = queja
    //const [sectores, setSectores] = useState(null)
  
    return ( 
        <div className="quejaContainer">
            {queja && 
                <div className="queja">
                    <h3>Sector:{sector}</h3>
                    <h3>Cantidad de Quejas:</h3><p>{totalQuejas}</p>
                    <h3>Monto total Reclamado:</h3><p>${montoTotalReclamado}</p>
                    <h3>Monto Recuperado:</h3><p>${montoTotalRecuperado}</p>
                </div>
            }
        </div>
     );
}
 
export default SumQuejasSector;