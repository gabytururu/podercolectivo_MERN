

// GET ALL QUEJAS //
const getQuejas = (req,res)=>{
    res.json({mssg: 'GET ALL QUEJAS FROM DB -- NO GOOD USE WITHOUT LOGIC TO SUMARIZE PER INDUSTRY'})
}
// GET SINGLE QUEJA //
const getQueja = (req,res)=>{
    res.json({mssg: 'GET SINGLE QUEJA FROM DB - NO GOOD USE PROBABLY UNLESS DASHBOARD GRAPHICS'})
}
// GET QUEJAS PER INDUSTRY (EG. AIRLINES) //
const getIndustryQuejas = (req,res)=>{
    res.json({mssg: 'GET QUEJAS ARRANGED PER INDUSTRY FROM DB'})
}
// GET QUEJAS PER INDUSTRY //
const getCompanyQuejas = (req,res)=>{
    res.json({mssg: 'GET QUEJAS ARRANGED PER COMPANY FROM DB'})
}
// POST QUEJA //
const postQueja = (req,res)=>{
    res.json({mssg: 'POST A NEW QUEJA FOR ANOTHER COLLECTION THAT IS USERS QUEJAS'})
}

module.exports = {
    getQuejas,
    getQueja,
    getIndustryQuejas,
    getCompanyQuejas,
    postQueja
}