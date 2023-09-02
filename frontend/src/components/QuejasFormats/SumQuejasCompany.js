import './QuejaCard.css'

const SumQuejasCompany = ({queja}) => {

    const {company, totalQuejas, montoTotalReclamado, montoTotalRecuperado,sector,costoBienServicio, giro} = queja
    //const [sectores, setSectores] = useState(null)
  
    return ( 
        <div className="quejaContainer">
            {queja && 
                <div className="queja">
                    <h3>{company}</h3>                    
                    <p className="quejaLegend">Quejas Recibidas:</p>
                    <p className="quejaQty">{totalQuejas} </p>
                    <p className="quejaLegend">Costo de los Bienes o Servicios en Disputa:</p>
                    <p className="quejaQty">${costoBienServicio} <span className="currency">MXN</span></p>
                    <p className="quejaLegend">El Giro de esta empresa es {giro}</p>
                </div>
            }
        </div>
     );

}
 
export default SumQuejasCompany;