import './QuejaCard.css'

const SumQuejasCompany = ({queja}) => {

    const {company, totalQuejas, montoTotalReclamado, montoTotalRecuperado,sector,totalComplaints,_id,totalValueMXN,costoBienServicio, giro} = queja
    //const [sectores, setSectores] = useState(null)
  
    return ( 
        <div className="quejaContainer">
            {queja && 
                <div className="queja">
                    <h3>{_id}</h3>                    
                    <p className="quejaLegend">Quejas Recibidas:</p>
                    <p className="quejaQty">{totalComplaints} </p>
                    <p className="quejaLegend">Costo de los Bienes o Servicios en Disputa:</p>
                    <p className="quejaQty">{totalValueMXN} <span className="currency">MXN</span></p>
                    <p className="quejaLegend">El Giro de esta empresa es {giro} y es parte del sector {sector}</p>
                </div>
            }
        </div>
     );

}
 
export default SumQuejasCompany;