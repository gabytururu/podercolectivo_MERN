const useQuejasByCategory = (quejas, categorySelected) =>{
    let categoriesArray = []
    quejas && quejas.map( queja => categoriesArray.includes(queja[categorySelected])?'':categoriesArray.push(queja[categorySelected]))

    let categoriesAggregatedIndicators = []
    for (let category of categoriesArray){
        let montoReclamado = 0
        let montoRecuperado = 0
        let costoBienServicio = 0
        let sector = ''
        let giro = ''
        const quejasThisCategory = quejas.filter((queja)=> queja[categorySelected] === category)
        const quejasQtyThisCategory = quejasThisCategory.length
        for(let queja of quejasThisCategory){
            montoReclamado = queja.monto_reclamado + montoReclamado
            montoRecuperado = queja.monto_recuperado_b + montoRecuperado
            costoBienServicio = queja.costo_bien_servicio + costoBienServicio
            sector = queja.sector
            giro = queja.giro
        }
        const thisElementinCategoryIndicators = {company: category, totalQuejas: quejasQtyThisCategory, montoTotalReclamado: montoReclamado, montoTotalRecuperado: montoRecuperado, sector: sector, costoBienServicio: costoBienServicio, giro:giro}
        categoriesAggregatedIndicators.push(thisElementinCategoryIndicators)
        // console.log(categoriesAggregatedIndicators)
    }
    //console.log(categoriesAggregatedIndicators)
    return categoriesAggregatedIndicators
}

export default useQuejasByCategory