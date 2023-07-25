const SumQuejasCompany = ({queja}) => {

    const {company, totalQuejas, montoTotalReclamado, montoTotalRecuperado,sectorCompany} = queja
    //const [sectores, setSectores] = useState(null)
  
    return ( 
        <div className="quejaContainer">
            {queja && 
                <div className="queja">
                    <h3>Empresa:{company}</h3>
                    <h3>Sector:{sectorCompany}</h3>
                    <h3>Cantidad de Quejas:</h3><p>{totalQuejas}</p>
                    <h3>Monto total Reclamado:</h3><p>${montoTotalReclamado}</p>
                    <h3>Monto Recuperado:</h3><p>${montoTotalRecuperado}</p>
                </div>
            }
        </div>
     );

}
 
export default SumQuejasCompany;