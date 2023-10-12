const fs = require('fs');
const XLSX = require('xlsx');

// 1st step : get the Excel and turn it into a 1st version JSON File

const excelFilePath = 'pc_sep2023.xlsx'
const workbook = XLSX.readFile(excelFilePath)
const sheetName = workbook.SheetNames[0]
const worksheet = workbook.Sheets[sheetName]
const jsonData = XLSX.utils.sheet_to_json(worksheet)

const jsonFilePath = 'dbPoderColectivo.json'
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData,null,2))

console.log(`1st Conversion complete. 1st JSON data saved to ${jsonFilePath}`);

// 2nd Step: take Json file, turn in into an array (las quejas)
const poderColectivoOriginalJsonDB = fs.readFileSync(jsonFilePath, 'utf-8')
const poderColectivoOriginalArrayDB = JSON.parse(poderColectivoOriginalJsonDB)
const lasQuejas = poderColectivoOriginalArrayDB

// 3rd Step: work with the array (lasQuejas) and transform it as needed (adding the param variables and checking amounts on costo_bien_servicio) and produce the new Array (lasNuevasQuejas)
const cleanGiro = (giro) =>{
    console.log('Value of Giro', giro)
    console.log('Type of Giro:', typeof giro);
    const cleanGiro = giro.replace(/,/g,'').replace(/\s/g,'-').normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase()
    return cleanGiro
    // const cleanGiro = giro.replace(/,/ig,'').replace(/\s/ig,'-').normalize("NFD").replace(/\p{Diacritic}/gu,'').toLowerCase()
    // return cleanGiro
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
const shortenNombreComercial = (nombreComercial) =>{
    const shortenNombreComercial = nombreComercial.replace('S.A de C.V','').replace('Sapi De Cv','').replace('S De Rl De Cv','').replace(/,+\s/ig,'')
    return shortenNombreComercial
}
const checkAmounts = (amount) =>{
    if(amount === "" || amount === "##########"){
        amount = 0
    }else if(typeof amount === 'number'){
        amount = amount
    }else if(typeof amount === 'string' && (amount.includes(',') || amount.includes('.'))){
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


// 4th Step use the new Array (lasNuevasQuejas) to produce the new JsonFile
const lasNuevasQuejasJson = JSON.stringify(lasNuevasQuejas,null,2)
const dbPoderColectivoFinal = 'dbPoderColectivoFinal.json'
fs.writeFile(dbPoderColectivoFinal, lasNuevasQuejasJson, 'utf-8', (err) =>{
    if(err){
        console.error('Error writing the NuevasQuejas JSON File ==>', err)
    }else{
        console.log('2nd Conversion Complete. 2nd JSON Data saved to dbPoderColectivoFinal.json')
    }
})

