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

router.get('/', isLoggedIn, (req, res)=>{
    res.render('profile/profile')
})

router.get('/items', isLoggedIn, (req, res) => {
    res.render('profile/items')
})

router.post('/items', isLoggedIn, (req, res) => {
    console.log(req.body.code, req.body.item)
    res.render('profile/items')
})

router.get('/champs', isLoggedIn, (req, res) => {
    res.render('profile/champs')
})

router.post('/champs', isLoggedIn, (req, res) => {
    console.log(req.body.champ, req.body.key)
    res.render('profile/champs')
})

router.get('/summoners', isLoggedIn, (req, res) => {
    res.render('profile/summoners')
})

router.post('/summoners', isLoggedIn, (req, res) => {
    console.log(req.body.name, req.body.id, req.body.puuid)
    res.render('profile/summoners')
})

module.exports = router


