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
const bodyParser = require('body-parser')
const db = require('../models')


router.get('/', isLoggedIn, (req, res)=>{
    db.champion.findAll({
        where: {userId: req.user.id}
    })
    .then((foundChampions)=>{
        res.render('builder/home', {favoriteChamps: foundChampions})
    })
    .catch((error)=>{
        res.render('error')
    })

})


router.get('/:name', isLoggedIn, (req, res)=>{
    axios.get(`https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion/${req.params.name}.json`)
    .then((response)=>{
        console.log(response.data.data[req.params.name])
        let champ = response.data.data[req.params.name]
        axios.get("https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/item.json")
        .then((response)=>{
            const arrayOfItems = Object.getOwnPropertyNames(response.data.data)
            res.render('builder/setBuild', 
            {
                champ: champ, 
                itemsObj: response.data.data, 
                itemName: arrayOfItems
            })
        })
    })
})

router.post('/:name/level', isLoggedIn, (req, res)=>{
    axios.get(`https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion/${req.params.name}.json`)
    .then((response)=>{
        let champ = response.data.data[req.params.name]
        axios.get("https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/item.json")
        .then((response)=>{
            const arrayOfItems = Object.getOwnPropertyNames(response.data.data)
            res.render('builder/updatedBuild', 
            {
                champ: champ, 
                itemsObj: response.data.data, 
                itemName: arrayOfItems,
                level: req.body.level
            })
        })
    })
})


module.exports = router