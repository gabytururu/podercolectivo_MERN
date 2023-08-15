import './QuejaCard.css'

const SumQuejasCompany = ({queja}) => {

    const {company, totalQuejas, montoTotalReclamado, montoTotalRecuperado,sector} = queja
    //const [sectores, setSectores] = useState(null)
  
    return ( 
        <div className="quejaContainer">
            {queja && 
                <div className="queja">
                    <h3>{company}</h3>                    
                    <p id="quejaLegend">Quejas Recibidas:</p>
                    <p id="quejaQty">{totalQuejas} </p>
                    <p>Monto total Reclamado: ${montoTotalReclamado}</p>
                    <p>Monto Recuperado: ${montoTotalRecuperado}</p>
                    <p>Sector al que pertenece: {sector}</p>
                </div>
            }
        </div>
     );

}
 
export default SumQuejasCompany;