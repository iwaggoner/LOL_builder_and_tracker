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
const db = require('../models')

router.get('/', isLoggedIn, (req, res)=>{
    res.render('profile/profile')
})

router.get('/items', isLoggedIn, (req, res) => {
    db.item.findAll({
        where: {userId: req.user.id}
    })
    .then((foundItems)=>{
        console.log(foundItems)
        res.render('profile/items', {favoriteItems:foundItems})
    })
    .catch((error)=>{
        res.render('error')
    })
    
})

router.post('/items', isLoggedIn, (req, res) => {
    db.item.findOrCreate({
        where: {
            name: req.body.item,
            code: req.body.code,
            userId: req.user.id
        }
    })
    .then((createdItem)=>{
        console.log(req.body.code, req.body.item)
        res.redirect('../profile/items')
    })
    .catch((error)=>{
        res.render('error')
    })
})


router.get('/champs', isLoggedIn, (req, res) => {
    db.champion.findAll({
        where: {userId: req.user.id}
    })
    .then((foundChampions)=>{
        console.log(foundChampions)
        res.render('profile/champs', {favoriteChampions: foundChampions})
    })
    .catch((error)=>{
        res.render('error')
    })
    
})

router.post('/champs', isLoggedIn, (req, res) => {
    db.champion.findOrCreate({
        where: {
            championKey:req.body.key,
            name: req.body.champ,
            userId: req.user.id
        }
    })
    .then((createdItem)=>{
        console.log(req.body.champ, req.body.key)
        res.redirect('../profile/champs')
    })
    .catch((error)=>{
        res.render('error')
    }) 
})

router.get('/summoners', isLoggedIn, (req, res) => {
    res.render('profile/summoners')
})

router.post('/summoners', isLoggedIn, (req, res) => {
    console.log(req.body.name, req.body.id, req.body.puuid)
    res.render('profile/summoners')
})

module.exports = router


