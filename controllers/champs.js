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


router.get('/', isLoggedIn, (req, res)=> {
    axios.get("https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json")
    .then(function (response) {
        const arrayOfChamps = Object.getOwnPropertyNames(response.data.data)
        res.render('champs/champ', {champsObj : response.data, champsNames: arrayOfChamps})
    })
    .catch(error =>{
        console.error
        res.render('error')
    })
})

router.get('/:name', isLoggedIn, (req, res)=>{
    const name = req.params.name
    axios.get(`https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion/${req.params.name}.json`)
    .then(function (response) {
        res.render('champs/names', {champ : response.data.data, name: name})
    })
    .catch(error =>{
        console.error
        res.render('error')
    })
})

module.exports = router