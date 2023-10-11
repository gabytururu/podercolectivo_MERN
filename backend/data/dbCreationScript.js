const fs = require('fs');
const XLSX = require('xlsx');

const excelFilePath = 'pc_sep2023.xlsx'
const workbook = XLSX.readFile(excelFilePath)
const sheetName = workbook.SheetNames[0]
const worksheet = woorkbook.Sheets[sheetName]
const jsonData = XLSX.utils.sheet_to_json(worksheet)

const jsonFilePath = 'dbPoderColectivo.json'
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData,null,2))

console.log(`Conversion complete. JSON data saved to ${jsonFilePath}`);