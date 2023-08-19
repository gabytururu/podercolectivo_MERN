import './QuejaCard.css'

const SumQuejasCompany = ({queja}) => {

    const {company, totalQuejas, montoTotalReclamado, montoTotalRecuperado,sector,costoBienServicio} = queja
    //const [sectores, setSectores] = useState(null)
  
    return ( 
        <div className="quejaContainer">
            {queja && 
                <div className="queja">
                    <h3>{company}</h3>                    
                    <p className="quejaLegend">Quejas Recibidas:</p>
                    <p className="quejaQty">{totalQuejas} </p>
                    <p className="quejaLegend">Costo de los Bienes o Servicios vinculados a estas Quejas:</p>
                    <p className="quejaQty">${costoBienServicio} </p>
                </div>
            }
        </div>
     );

}
 
export default SumQuejasCompany;