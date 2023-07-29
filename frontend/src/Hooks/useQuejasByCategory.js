const useQuejasByCategory = (quejas, categorySelected) =>{
    let categoriesArray = []
    quejas && quejas.map( queja => categoriesArray.includes(queja[categorySelected])?'':categoriesArray.push(queja[categorySelected]))

    let categoriesAggregatedIndicators = []
    for (let category of categoriesArray){
        let montoReclamado = 0
        let montoRecuperado = 0
        let sector = ''
        const quejasThisCategory = quejas.filter((queja)=> queja[categorySelected] === category)
        const quejasQtyThisCategory = quejasThisCategory.length
        for(let queja of quejasThisCategory){
            montoReclamado = queja.monto_reclamado + montoReclamado
            montoRecuperado = queja.monto_recuperado_b + montoRecuperado
            sector = queja.sector
        }
        const thisElementinCategoryIndicators = {company: category, totalQuejas: quejasQtyThisCategory, montoTotalReclamado: montoReclamado, montoTotalRecuperado: montoRecuperado, sector: sector}
        categoriesAggregatedIndicators.push(thisElementinCategoryIndicators)
        // console.log(categoriesAggregatedIndicators)
    }
    return categoriesAggregatedIndicators
}

export default useQuejasByCategory