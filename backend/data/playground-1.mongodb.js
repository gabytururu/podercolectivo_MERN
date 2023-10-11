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
const lasQuejas =[
    
/// aca irian las quejas de la db pero pues es masivo... toca resolver via mongodb methods

]


//wont work bc this requires a runtime environment while the rest of the code is actually made for a web-based code environment - so this would only work if instead i was just running a backend application where i need to work w data like the scrapping app for instance

    // const fs = require('fs')
    // const poderColectivoJsonDB = fs.readFileSync('dbPoderColectivo.json', 'utf-8')
    // const poderColectivoArrayDB = JSON.parse(poderColectivoJsonDB)
    // const lasQuejas = poderColectivoArrayDB


//wont work either bc the fetch method is not available in the mongodb playground environment
        // const jsonFilePath = 'dbPoderColectivo.json'
        // fetch(jsonFilePath)
        //     .then(response=> response.json())
        //     .then(dataArray=>{

        //         const lasQuejas = dataArray
        //         const lasNuevasQuejas = lasQuejas.map((queja) =>{    
                    
        //             const nuevoModeloQuejas = queja           
        //             queja.costo_bien_servicio = checkAmounts(queja.costo_bien_servicio)   
        //             queja.giroParamUrl = cleanGiro(queja.giro)
        //             queja.nombreComercialParamUrl = cleanNombreComercial(queja.nombreComercial)
        //             queja.sectorParamUrl = cleanSector(queja.sector)
        //             queja.nombreComercialCorto = shortenNombreComercial(queja.nombreComercial)
                    
        //             return nuevoModeloQuejas
        //         })
                
        //         use('poderColectivo');
        //         db.getCollection('quejas').insertMany(lasNuevasQuejas);
        //     })
        //     .catch(error=> console.error('Error ==>', error))



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
            }else if(amount !== ""){
                const numberAmount = Number(amount.replace(',',''))
                amount = numberAmount
            }
        
            return amount
        }

    const lasNuevasQuejas = lasQuejas.map((queja) =>{    
        const nuevoModeloQuejas = queja
    
        queja.costo_bien_servicio = checkAmounts(queja.costo_bien_servicio)   
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

    // queja.costo_bien_servicio = Number(queja.costo_bien_servicio)
    // queja.monto_reclamado = Number(queja.monto_reclamado)
    // queja.monto_recuperado = Number(queja.monto_recuperado)
    // queja.monto_recuperado_b = Number(queja.monto_recuperado_b)
     // queja.monto_reclamado = checkAmounts(queja.monto_reclamado)
    // queja.monto_recuperado =checkAmounts(queja.monto_recuperado)
    // queja.monto_recuperado_b = checkAmounts(queja.monto_recuperado_b)


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
