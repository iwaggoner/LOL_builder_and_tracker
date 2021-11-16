require('dotenv').config()
const express = require('express')
const router = express.Router()
const parser = require("body-parser")
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('../config/ppConfig')
const axios = require('axios')
const flash = require('connect-flash')
const isLoggedIn = require('../middleware/isLoggedIn')
const { response } = require('express')




router.post('/', isLoggedIn, (req, res)=>{
    let summonerId = req.body.code
    let summoner = req.body
    axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${process.env.SUPER_SECRET_SECRET}`)
    .then((response) =>{
        let data = response.data
        res.render('summonerInfo/home', {data: data[0], summoner: summoner})
    })
    .catch((error)=>{
        res.render(error)
    })  
})


router.post('/mastery', isLoggedIn, (req, res)=>{
    console.log(req.body)
    
    res.render('summonerInfo/mastery')
})

router.post('/match-history', isLoggedIn, (req, res)=>{
    console.log(req.body)
    res.render('summonerInfo/matchHistory')
})


module.exports = router