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


router.get('/', isLoggedIn, (req, res) => {

    axios.get("https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/item.json")
    .then(function (response) {
        const arrayOfItems = Object.getOwnPropertyNames(response.data.data)
        res.render('items/items', {itemsObj: response.data.data, name: arrayOfItems})

    })
    .catch(error =>{
        console.error
        res.render('error')
    })
})

router.get('/:id', isLoggedIn, (req, res) => {

    axios.get("https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/item.json")
    .then(function (response) {
        const id = req.params.id
        res.render('items/show', {itemsObj: response.data.data, id: id})
    })
    .catch(error =>{
        console.error
        res.render('error')
    })
})

module.exports = router