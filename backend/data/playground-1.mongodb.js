/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
const lasQuejas = [
    {
        "id_exp": "2022_5695",
        "fecha_ingreso": "03/01/2022",
        "fecha_fin": "14/06/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Conciliada",
        "proveedor": "Promotora Turistica Vaera, S.A de C.V",
        "nombreComercial": "Promotora Turistica Vaera, S.A de C.V",
        "giro": "Hoteles, Moteles Y Similares",
        "sector": "Turístico",
        "odeco": "Hoteles, Moteles Y Similares",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Negativa a bonificación por cambio de producto",
        "costo_bien_servicio": "1,091",
        "monto_reclamado": "1,091",
        "monto_recuperado": "1,091",
        "monto_recuperado_b": "1,091"
    },
    {
        "id_exp": "2022_1523",
        "fecha_ingreso": "03/01/2022",
        "fecha_fin": "01/08/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Desistimiento",
        "proveedor": "Aerovias De Mexico, S.A de C.V",
        "nombreComercial": "Aeroméxico",
        "giro": "Aerolínea Comercial",
        "sector": "Turístico",
        "odeco": "Aerolínea Comercial",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Incumplimiento de plazos para la entrega del prod. o serv.",
        "costo_bien_servicio": "",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_1524",
        "fecha_ingreso": "03/01/2022",
        "fecha_fin": "02/05/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Conciliada",
        "proveedor": "Aerovias De Mexico, S.A de C.V",
        "nombreComercial": "Aeroméxico",
        "giro": "Aerolínea Comercial",
        "sector": "Turístico",
        "odeco": "Aerolínea Comercial",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Incumplimiento de plazos para la entrega del prod. o serv.",
        "costo_bien_servicio": "15,442",
        "monto_reclamado": "15,442",
        "monto_recuperado": "15,442",
        "monto_recuperado_b": "15,442"
    },
    {
        "id_exp": "2022_1",
        "fecha_ingreso": "03/01/2022",
        "fecha_fin": "06/09/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Desistimiento",
        "proveedor": "Concesionaria Vuela Compañia De Aviacion, Sapi De Cv",
        "nombreComercial": "Volaris",
        "giro": "Aerolínea Comercial",
        "sector": "Turístico",
        "odeco": "Aerolínea Comercial",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Negativa a cambio o devolución",
        "costo_bien_servicio": "1,995",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_3587",
        "fecha_ingreso": "03/01/2022",
        "fecha_fin": "",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "En Trámite",
        "proveedor": "Aerovias De Mexico, S.A de C.V",
        "nombreComercial": "Aeroméxico",
        "giro": "Aerolínea Comercial",
        "sector": "Turístico",
        "odeco": "Aerolínea Comercial",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Negativa a devolución del precio pagado",
        "costo_bien_servicio": "34,571",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_4500",
        "fecha_ingreso": "03/01/2022",
        "fecha_fin": "01/04/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Conciliada",
        "proveedor": "Aeroenlaces Nacionales, S.A de C.V",
        "nombreComercial": "Viva Aerobus",
        "giro": "Aerolínea Comercial",
        "sector": "Turístico",
        "odeco": "Aerolínea Comercial",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Cancelación de vuelo",
        "costo_bien_servicio": "5,304",
        "monto_reclamado": "5,304",
        "monto_recuperado": "5,304",
        "monto_recuperado_b": "5,304"
    },
    {
        "id_exp": "2022_5605",
        "fecha_ingreso": "03/01/2022",
        "fecha_fin": "03/05/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Conciliada",
        "proveedor": "Rivera Apizaco, S.A de C.V",
        "nombreComercial": "Rivera Apizaco, S.A de C.V",
        "giro": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Nuevos",
        "sector": "Automotriz",
        "odeco": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Nuevos",
        "estado_ua": "Automotriz",
        "motivo_reclamacion": "Negativa a la entrega del producto o servicio",
        "costo_bien_servicio": "339,400",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_5696",
        "fecha_ingreso": "03/01/2022",
        "fecha_fin": "30/06/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Conciliada",
        "proveedor": "Aeroenlaces Nacionales, S.A de C.V",
        "nombreComercial": "Viva Aerobus",
        "giro": "Aerolínea Comercial",
        "sector": "Turístico",
        "odeco": "Aerolínea Comercial",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Negativa al servicio",
        "costo_bien_servicio": "9,715",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_1970",
        "fecha_ingreso": "03/01/2022",
        "fecha_fin": "13/04/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Conciliada",
        "proveedor": "American Airlines, Inc",
        "nombreComercial": "American Airlines",
        "giro": "Aerolínea Comercial",
        "sector": "Turístico",
        "odeco": "Aerolínea Comercial",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Negativa al servicio",
        "costo_bien_servicio": "33,210",
        "monto_reclamado": "33,210",
        "monto_recuperado": "22,000",
        "monto_recuperado_b": "22,000"
    },
    {
        "id_exp": "2022_1533",
        "fecha_ingreso": "03/01/2022",
        "fecha_fin": "",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "En Trámite",
        "proveedor": "Aerovias De Mexico, S.A de C.V",
        "nombreComercial": "Aeroméxico",
        "giro": "Aerolínea Comercial",
        "sector": "Turístico",
        "odeco": "Aerolínea Comercial",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Incumplimiento de plazos para la entrega del prod. o serv.",
        "costo_bien_servicio": "",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_1360",
        "fecha_ingreso": "03/01/2022",
        "fecha_fin": "27/01/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "No Conciliada",
        "proveedor": "Roval Automotriz, S.A de C.V",
        "nombreComercial": "Roval Automotriz, S.A de C.V",
        "giro": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Usados",
        "sector": "Automotriz",
        "odeco": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Usados",
        "estado_ua": "Automotriz",
        "motivo_reclamacion": "Negativa a la entrega del producto o servicio",
        "costo_bien_servicio": "332,000",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_1851",
        "fecha_ingreso": "03/01/2022",
        "fecha_fin": "09/11/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Desistimiento",
        "proveedor": "Aeroenlaces Nacionales, S.A de C.V",
        "nombreComercial": "Viva Aerobus",
        "giro": "Aerolínea Comercial",
        "sector": "Turístico",
        "odeco": "Aerolínea Comercial",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Negativa al servicio",
        "costo_bien_servicio": "26,101",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_3596",
        "fecha_ingreso": "04/01/2022",
        "fecha_fin": "",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "En Trámite",
        "proveedor": "Aerovias De Mexico, S.A de C.V",
        "nombreComercial": "Aeroméxico",
        "giro": "Aerolínea Comercial",
        "sector": "Turístico",
        "odeco": "Aerolínea Comercial",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Responsabilidad del proveedor por actos de sus dependientes",
        "costo_bien_servicio": "20,601",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_3442",
        "fecha_ingreso": "04/01/2022",
        "fecha_fin": "17/06/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Desistimiento",
        "proveedor": "Alitalia-Societa Aerea Italiana, Spa",
        "nombreComercial": "Alitalia",
        "giro": "Aerolínea Comercial",
        "sector": "Turístico",
        "odeco": "Aerolínea Comercial",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Negativa a cambio o devolución",
        "costo_bien_servicio": "22,166",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_1540",
        "fecha_ingreso": "04/01/2022",
        "fecha_fin": "09/08/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Desistimiento",
        "proveedor": "Auto Shat, S.A de C.V",
        "nombreComercial": "Auto Shat, S.A de C.V",
        "giro": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Usados",
        "sector": "Automotriz",
        "odeco": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Usados",
        "estado_ua": "Automotriz",
        "motivo_reclamacion": "Negativa a hacer efectiva la garantía",
        "costo_bien_servicio": "185,000",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_3312",
        "fecha_ingreso": "04/01/2022",
        "fecha_fin": "06/04/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "No Conciliada",
        "proveedor": "Rile Texcoco, S.A de C.V",
        "nombreComercial": "Rile Texcoco, S.A de C.V",
        "giro": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Usados",
        "sector": "Automotriz",
        "odeco": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Usados",
        "estado_ua": "Automotriz",
        "motivo_reclamacion": "Negativa a la entrega del producto o servicio",
        "costo_bien_servicio": "160,000",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_9",
        "fecha_ingreso": "04/01/2022",
        "fecha_fin": "10/01/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Conciliada",
        "proveedor": "Aerovias De Mexico, S.A de C.V",
        "nombreComercial": "Aeroméxico",
        "giro": "Aerolínea Comercial",
        "sector": "Turístico",
        "odeco": "Aerolínea Comercial",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Solicitud de cambio de producto",
        "costo_bien_servicio": "4,433",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_5704",
        "fecha_ingreso": "04/01/2022",
        "fecha_fin": "04/04/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "No Conciliada",
        "proveedor": "Maya Motriz, S.A de C.V",
        "nombreComercial": "Maya Motriz, S.A de C.V",
        "giro": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Nuevos",
        "sector": "Automotriz",
        "odeco": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Nuevos",
        "estado_ua": "Automotriz",
        "motivo_reclamacion": "Negativa a hacer efectiva la garantía",
        "costo_bien_servicio": "##########",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_158",
        "fecha_ingreso": "04/01/2022",
        "fecha_fin": "03/09/2022",
        "tipo_conciliacion": "Turnada a Concil Resi p/ segui",
        "estado_procesal": "Desistimiento",
        "proveedor": "Abc Aerolineas, S.A de C.V",
        "nombreComercial": "Interjet",
        "giro": "Aerolínea Comercial",
        "sector": "Turístico",
        "odeco": "Aerolínea Comercial",
        "estado_ua": "Turístico",
        "motivo_reclamacion": "Cancelación de vuelo",
        "costo_bien_servicio": "",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_2327",
        "fecha_ingreso": "04/01/2022",
        "fecha_fin": "18/02/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Conciliada",
        "proveedor": "Uvi Tech, Sapi De Cv",
        "nombreComercial": "Kavak",
        "giro": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Usados",
        "sector": "Automotriz",
        "odeco": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Usados",
        "estado_ua": "Automotriz",
        "motivo_reclamacion": "Negativa a la entrega del producto o servicio",
        "costo_bien_servicio": "329,986",
        "monto_reclamado": "32,998",
        "monto_recuperado": "32,998",
        "monto_recuperado_b": "32,998"
    },
    {
        "id_exp": "2022_4238",
        "fecha_ingreso": "04/01/2022",
        "fecha_fin": "04/03/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Desistimiento",
        "proveedor": "Autocom Alfa, Sapi De Cv",
        "nombreComercial": "Autocom Alfa, Sapi De Cv",
        "giro": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Nuevos",
        "sector": "Automotriz",
        "odeco": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Nuevos",
        "estado_ua": "Automotriz",
        "motivo_reclamacion": "Negativa a la entrega del producto o servicio",
        "costo_bien_servicio": "365,900",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_4238",
        "fecha_ingreso": "04/01/2022",
        "fecha_fin": "04/03/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Desistimiento",
        "proveedor": "Nissan Mexicana, S.A de C.V",
        "nombreComercial": "Nissan",
        "giro": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Nuevos",
        "sector": "Automotriz",
        "odeco": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Nuevos",
        "estado_ua": "Automotriz",
        "motivo_reclamacion": "Negativa a la entrega del producto o servicio",
        "costo_bien_servicio": "365,900",
        "monto_reclamado": "",
        "monto_recuperado": "",
        "monto_recuperado_b": ""
    },
    {
        "id_exp": "2022_4503",
        "fecha_ingreso": "04/01/2022",
        "fecha_fin": "28/04/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Conciliada",
        "proveedor": "Fca Mexico, S.A de C.V",
        "nombreComercial": "Fca Mexico, S.A de C.V",
        "giro": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Usados",
        "sector": "Automotriz",
        "odeco": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Usados",
        "estado_ua": "Automotriz",
        "motivo_reclamacion": "Negativa a hacer efectiva la garantía",
        "costo_bien_servicio": "206,900",
        "monto_reclamado": "103,450",
        "monto_recuperado": "103,450",
        "monto_recuperado_b": "103,450"
    },
    {
        "id_exp": "2022_4503",
        "fecha_ingreso": "04/01/2022",
        "fecha_fin": "28/04/2022",
        "tipo_conciliacion": "Turnada a Concil Person p/seg",
        "estado_procesal": "Conciliada",
        "proveedor": "Refran Autos, S De Rl De Cv",
        "nombreComercial": "Refran Autos, S De Rl De Cv",
        "giro": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Usados",
        "sector": "Automotriz",
        "odeco": "Agencia Automotriz Y Concesionaria De Automóviles Y Camionetas Usados",
        "estado_ua": "Automotriz",
        "motivo_reclamacion": "Negativa a hacer efectiva la garantía",
        "costo_bien_servicio": "206,900",
        "monto_reclamado": "103,450",
        "monto_recuperado": "103,450",
        "monto_recuperado_b": "103,450"
    }
]

// TO BE USED AS URL PARAMS (must eliminate diacritics, spaces + shorten length)
const cleanGiro = (giro) =>{
    const cleanGiro = giro.replace(/,/ig,'').replace(/\s/ig,'-').normalize("NFD").replace(/\p{Diacritic}/gu,'')
    return cleanGiro
}

const cleanNombreComercial = (nombreComercial) =>{
    const shortenNombreComercial = nombreComercial.replace('S.A de C.V','').replace('Sapi De Cv','').replace('S De Rl De Cv','').replace(/,+\s/ig,'')
    const cleanNombreComercial = shortenNombreComercial.replace(/,/ig,'').replace(/\s/ig,'-').normalize("NFD").replace(/\p{Diacritic}/gu,'')
    return cleanNombreComercial
}

const cleanSector = (sector) =>{
    const cleanSector = sector.replace(/,/ig,'').replace(/\s/ig,'-').normalize("NFD").replace(/\p{Diacritic}/gu,'')
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
    }else if(amount !== ""){
        const numberAmount = Number(amount.replace(',',''))
        amount = numberAmount
    }
   
    return amount
}

const lasNuevasQuejas = lasQuejas.map((queja) =>{    
    const nuevoModeloQuejas = queja
    // queja.costo_bien_servicio = Number(queja.costo_bien_servicio)
    // queja.monto_reclamado = Number(queja.monto_reclamado)
    // queja.monto_recuperado = Number(queja.monto_recuperado)
    // queja.monto_recuperado_b = Number(queja.monto_recuperado_b)
    queja.costo_bien_servicio = checkAmounts(queja.costo_bien_servicio)
    queja.monto_reclamado = checkAmounts(queja.monto_reclamado)
    queja.monto_recuperado =checkAmounts(queja.monto_recuperado)
    queja.monto_recuperado_b = checkAmounts(queja.monto_recuperado_b)
    queja.giroParamUrl = cleanGiro(queja.giro)
    queja.nombreComercialParamUrl = cleanNombreComercial(queja.nombreComercial)
    queja.sectorParamUrl = cleanSector(queja.sector)
    queja.nombreComercialCorto = shortenNombreComercial(queja.nombreComercial)
    
    return nuevoModeloQuejas
})

use('poderColectivo');

// Insert a few documents into the sales collection.
   db.getCollection('quejas').insertMany(lasNuevasQuejas);

// delete all documents from a collection
    // db.getCollection('quejas').deleteMany({})


// Run a find command to view items sold on April 4th, 2014.
    // const salesOnApril4th = db.getCollection('sales').find({
    // date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
    // }).count();

// Print a message to the output window.
    // console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
    // db.getCollection('sales').aggregate([
    // // Find all of the sales that occurred in 2014.
    // { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
    // // Group the total sales for each product.
    // { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
    // ]);
