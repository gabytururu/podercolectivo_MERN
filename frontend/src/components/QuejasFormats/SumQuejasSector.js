
const SumQuejasSector = ({queja}) => {   
    
    const {sector, totalQuejas, montoTotalReclamado, montoTotalRecuperado,costoBienServicio, giro} = queja
    //const [sectores, setSectores] = useState(null)
  
    return ( 
     
        <div className="quejaContainer">
            {queja &&                 
                <div className="queja">
                    <h3>Sector {sector}</h3>
                    <p className="quejaLegend">Giro dentro del sector: {giro}</p>
                    <p className="quejaLegend">Cantidad de Quejas en este Sector:</p>
                    <p className="quejaQty"> {totalQuejas}</p>
                    <p className="quejaLegend">Costo de los bienes o servicios vinculados a estas quejas:</p>
                    <p className="quejaQty"> ${costoBienServicio}</p>
                    {/* <p>Monto total Reclamado: ${montoTotalReclamado}</p>
                    <p>Monto Recuperado: ${montoTotalRecuperado}</p> */}
                 
                </div>
              
            }
        </div>
     );
}
 
export default SumQuejasSector;