const lasQuejas =[
    {
      id_exp: "2022_1",
      fecha_ingreso: 44564,
      fecha_fin: 44810,
      estado_procesal: "Desistimiento",
      proveedor: "CONCESIONARIA VUELA COMPAÑIA DE AVIACION, SAPI DE CV",
      nombreComercial: "VOLARIS",
      giro: "AEROLÍNEA COMERCIAL",
      sector: "TURÍSTICO",
      odeco: "AEROLÍNEA COMERCIAL",
      estado_ua: "AGUASCALIENTES",
      tipo_reclamacion_causaCorta: "Cambios, devoluciones o bonificaciones",
      motivo_reclamacion_causaLarga: "Negativa a cambio o devolución",
      costo_bien_servicio: "asdfa1,222.25asdf69ek"
    },
    {
      id_exp: "2022_2",
      fecha_ingreso: 44564,
      fecha_fin: 44742,
      estado_procesal: "Desistimiento",
      proveedor: 0,
      nombreComercial: "COMERCIAL IAC, SA DE CV",
      giro: "TIENDA DE ROPA",
      sector: 0,
      odeco: "TIENDA DE ROPA",
      estado_ua: "AGUASCALIENTES",
      tipo_reclamacion_causaCorta: "Cobro indebido",
      motivo_reclamacion_causaLarga: "Cobro de cuota extraordinaria",
      costo_bien_servicio: 279.98
    },
    {
      id_exp: "2022_2",
      fecha_ingreso: 44564,
      fecha_fin: 44742,
      estado_procesal: "Desistimiento",
      proveedor: 0,
      nombreComercial: "COMERCIAL IAC, SA DE CV",
      giro: 0,
      sector: 0,
      odeco: 0,
      estado_ua: "AGUASCALIENTES",
      tipo_reclamacion_causaCorta: "Cobro indebido",
      motivo_reclamacion_causaLarga: "Cobro de cuota extraordinaria",
      costo_bien_servicio: 279.98
    },
    {
      id_exp: "2022_2",
      fecha_ingreso: 44564,
      fecha_fin: 44742,
      estado_procesal: "Desistimiento",
      proveedor: "COMERCIAL IAC, SA DE CV",
      nombreComercial: "COMERCIAL IAC, SA DE CV",
      giro: "TIENDA DE ROPA",
      sector: "TIENDA DE ROPA",
      odeco: "TIENDA DE ROPA",
      estado_ua: "AGUASCALIENTES",
      tipo_reclamacion_causaCorta: "Cobro indebido",
      motivo_reclamacion_causaLarga: "Cobro de cuota extraordinaria",
      costo_bien_servicio: 279.98
    },
]



// TO BE USED AS URL PARAMS (must eliminate diacritics, spaces + shorten length)
        const cleanGiro = (giro) =>{
            const cleanGiro = giro.replace(/,/ig,'').replace(/\s/ig,'-').normalize("NFD").replace(/\p{Diacritic}/gu,'').toLowerCase()
            return cleanGiro
        }

        const cleanNombreComercial = (nombreComercial) =>{
            const shortenNombreComercial = nombreComercial.replace('S.A de C.V','').replace('Sapi De Cv','').replace('S De Rl De Cv','').replace(/,+\s/ig,'')
            const cleanNombreComercial = shortenNombreComercial.replace(/,/ig,'').replace(/\s/ig,'-').normalize("NFD").replace(/\p{Diacritic}/gu,'').toLowerCase()
            return cleanNombreComercial
        }

        const cleanSector = (sector) =>{
            const cleanSector = sector.replace(/,/ig,'').replace(/\s/ig,'-').normalize("NFD").replace(/\p{Diacritic}/gu,'').toLowerCase()
            return cleanSector
        }

        // TO BE USED IN GRAPH (no need to remove diacritics or spaces)
        const shortenNombreComercial = (nombreComercial) =>{
            const shortenNombreComercial = nombreComercial.replace('S.A de C.V','').replace('Sapi De Cv','').replace('S De Rl De Cv','').replace(/,+\s/ig,'')
            return shortenNombreComercial
        }

        const checkAmounts = (amount) =>{
            if(amount === "" || amount === "##########"){
                amount = 0
            }else if(typeof amount === 'number'){
                amount = amount
            }else if(typeof amount === 'string' && amount.includes(',') || amount.includes('.')){
                const numberAmount = Number(amount.replace(',',''))
                amount = numberAmount
                isNaN(amount) ? amount = 0 : amount = amount
            }else if(isNaN(amount)){
                amount = 0
            }        
            return amount
        }

        const cleanZerosInStrings = (queja) =>{
            if (queja.proveedor === 0){
                queja.proveedor = "No Publicado"
            }
            if(queja.nombreComercial === 0){
                queja.nombreComercial = "No Publicado"
            }
            if(queja.giro === 0){
                queja.giro = "No Publicado"
            }
            if(queja.sector === 0){
                queja.sector = "No Publicado"
            }
            if(queja.odeco ===0){
                queja.odeco = "No Publicado"
            }
            if(queja.tipo_reclamacion_causaCorta){
                queja.tipo_reclamacion_causaCorta = "No Publicado"
            }
            if(queja.motivo_reclamacion_causaLarga){
                queja.motivo_reclamacion_causaLarga = "No Publicado"
            }
            
            return queja
        }


        const lasNuevasQuejas = lasQuejas.map((queja) =>{    
            const nuevoModeloQuejas = cleanZerosInStrings(queja)    
            
            queja.costo_bien_servicio = checkAmounts(queja.costo_bien_servicio)   
            queja.giroParamUrl = cleanGiro(queja.giro)
            queja.nombreComercialParamUrl = cleanNombreComercial(queja.nombreComercial)
            queja.sectorParamUrl = cleanSector(queja.sector)
            queja.nombreComercialCorto = shortenNombreComercial(queja.nombreComercial)
            
            return nuevoModeloQuejas
        })

    console.log('el objeto con el modelo de quejas ---> ', lasNuevasQuejas)

    // use('poderColectivo');

// // Insert a few documents into the sales collection.
    // db.getCollection('quejas').insertMany(lasNuevasQuejas);
