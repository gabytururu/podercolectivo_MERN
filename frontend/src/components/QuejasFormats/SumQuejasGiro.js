const SumQuejasGiro = ({queja}) => {   
    
    const {sector, totalQuejas, montoTotalReclamado, montoTotalRecuperado,costoBienServicio, giro, totalComplaints, _id, totalValueMXN} = queja
    //const [sectores, setSectores] = useState(null)
  
    return ( 
     
        <div className="quejaContainer">
            {queja &&                 
                <div className="queja">
                    <h3>{_id}</h3>
                    {/* <p className="quejaLegend">Giro dentro del sector: {sector}</p> */}
                    <p className="quejaLegend">Cantidad de Quejas en este Giro Comercial:</p>
                    <p className="quejaQty"> {totalComplaints}</p>
                    <p className="quejaLegend">Costo de los bienes o servicios en disputa:</p>
                    <p className="quejaQty"> {totalValueMXN} <span className="currency">MXN</span></p>
                    {/* <p>Monto total Reclamado: ${montoTotalReclamado}</p>
                    <p>Monto Recuperado: ${montoTotalRecuperado}</p> */}
                </div>
              
            }
        </div>
     );
}
 
export default SumQuejasGiro;