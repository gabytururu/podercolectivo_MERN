import './QuejaCard.css'

const SumQuejasCompany = ({queja}) => {

    const {company, totalQuejas, montoTotalReclamado, montoTotalRecuperado,sectorCompany} = queja
    //const [sectores, setSectores] = useState(null)
  
    return ( 
        <div className="quejaContainer">
            {queja && 
                <div className="queja">
                    <h3>{company}</h3>
                    <p>Sector:{sectorCompany}</p>
                    <p>Cantidad de Quejas:</p><p>{totalQuejas}</p>
                    <p>Monto total Reclamado:</p><p>${montoTotalReclamado}</p>
                    <p>Monto Recuperado:</p><p>${montoTotalRecuperado}</p>
                </div>
            }
        </div>
     );

}
 
export default SumQuejasCompany;