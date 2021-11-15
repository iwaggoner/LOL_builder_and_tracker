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



router.get('/', isLoggedIn, (req, res) =>{
    res.render('summoners/search')
})


router.get('/results', isLoggedIn, (req, res) => {
    let name = req.query.summoner
    
    axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.SUPER_SECRET_SECRET}`)
    .then(function (response){
        console.log(response.data)
        res.render('summoners/results', {summoner: response.data})
    })
    .catch(error =>{
        console.error
    })
    
})


module.exports = router