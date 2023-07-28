
const SumQuejasSector = ({queja}) => {   
    
    const {sector, totalQuejas, montoTotalReclamado, montoTotalRecuperado} = queja
    //const [sectores, setSectores] = useState(null)
  
    return ( 
        <div className="quejaContainer">
            {queja && 
                <div className="queja">
                    <h3>Sector {sector}</h3>
                    <p>Cantidad de Quejas: {totalQuejas}</p>
                    <p>Monto total Reclamado: ${montoTotalReclamado}</p>
                    <p>Monto Recuperado: ${montoTotalRecuperado}</p>
                </div>
            }
        </div>
     );
}
 
export default SumQuejasSector;