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
        console.log(data[0])
        if(data[0] == undefined) {
            console.log('No ranked Games played')
            res.render('summonerInfo/nrHome', {summoner: summoner})
        } else {
        res.render('summonerInfo/home', {data: data[0], summoner: summoner})
        }
    })
    .catch((error)=>{
        res.render(error)
    })  
})

// Route will pull the summoners top 5 most played champions
router.post('/mastery', isLoggedIn, (req, res)=>{
    let summonerId = req.body.code
    let summoner = req.body
    let topFive = []
    axios.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${process.env.SUPER_SECRET_SECRET}`)
    .then((response)=>{
        for(let i =0;i<5;i++){
            topFive.push(response.data[i].championId)
        }
        axios.get("https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json")
        .then((response)=>{
            let championObj =  response.data.data
            const arrayOfChamps = Object.getOwnPropertyNames(response.data.data)
            res.render('summonerInfo/mastery', 
                {championObj: championObj,
                 topFive: topFive, 
                 champNames: arrayOfChamps
                })
        })    
    })
    .catch((error)=>{
        res.render('error')
    })
})

router.post('/match-history', isLoggedIn, (req, res)=>{
    console.log(req.body)
    res.render('summonerInfo/matchHistory')
})


module.exports = router