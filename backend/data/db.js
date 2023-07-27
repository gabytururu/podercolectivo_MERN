const quejasJson = [{
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
]

const lasNuevasQuejas = quejasJson.map((queja) =>{
       
    const nuevoModeloQuejas = queja
    //console.log('la nueva costo del bien de la queja sin coma ----> ',queja.costo_bien_servicio.replace(',',''))
    queja.costo_bien_servicio = Number(queja.costo_bien_servicio.replace(',',''))
    queja.monto_reclamado = Number(queja.monto_reclamado.replace(',',''))
    queja.monto_recuperado = Number(queja.monto_recuperado.replace(',',''))
    queja.monto_recuperado_b = Number(queja.monto_recuperado_b.replace(',',''))
    
    return nuevoModeloQuejas
})

console.log(lasNuevasQuejas)