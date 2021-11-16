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


// Home Profile Route
router.get('/', isLoggedIn, (req, res)=>{
    res.render('profile/profile')
})

// View Faviortie items route
router.get('/items', isLoggedIn, (req, res) => {
    db.item.findAll({
        where: {userId: req.user.id}
    })
    .then((foundItems)=>{
        res.render('profile/items', {favoriteItems:foundItems})
    })
    .catch((error)=>{
        res.render('error')
    })
    
})

// Route that is called when an item is faviorited
router.post('/items', isLoggedIn, (req, res) => {
    db.item.findOrCreate({
        where: {
            name: req.body.item,
            code: req.body.code,
            userId: req.user.id
        }
    })
    .then((createdItem)=>{
        res.redirect('../profile/items')
    })
    .catch((error)=>{
        res.render('error')
    })
})

// Route that deletes a favorite Item
router.delete('/items/:id', (req,res) => {
    db.item.destroy({
        where: {
            name: req.body.name,
            code: req.body.code,
            userId: req.body.userId
        }
    })
    .then((deletedItem)=>{
        res.redirect('/profile/items')
    })
    .catch((error)=>{
        res.render('error')
    })
})

// View Faviorte Champion route
router.get('/champs', isLoggedIn, (req, res) => {
    db.champion.findAll({
        where: {userId: req.user.id}
    })
    .then((foundChampions)=>{
        res.render('profile/champs', {favoriteChampions: foundChampions})
    })
    .catch((error)=>{
        res.render('error')
    })
    
})

// Route that addes Champion to favorites
router.post('/champs', isLoggedIn, (req, res) => {
    db.champion.findOrCreate({
        where: {
            championKey:req.body.key,
            name: req.body.champ,
            userId: req.user.id
        }
    })
    .then((createdChampion)=>{
        console.log(req.body.champ, req.body.key)
        res.redirect('../profile/champs')
    })
    .catch((error)=>{
        res.render('error')
    }) 
})

// Route to delete Champions from faviortes
router.delete('/champs/:id', (req,res) => {
    db.champion.destroy({
        where: {
            championKey: req.body.championKey,
            name: req.body.name,
            userId: req.body.userId
        }
    })
    .then((deletedItem)=>{
        res.redirect('/profile/champs')
    })
    .catch((error)=>{
        res.render('error')
    })
})

// Route to view summoners
router.get('/summoners', isLoggedIn, (req, res) => {
    db.summoner.findAll({
        where: {userId: req.user.id}
    })
    .then((foundSummoners)=>{
        console.log(foundSummoners)
        res.render('profile/summoners', {favoriteSummoners:foundSummoners})
    })
    .catch((error)=>{
        res.render('error')
    })
    
})

// Route to add summoners
router.post('/summoners', isLoggedIn, (req, res) => {
    db.summoner.findOrCreate({
        where: {
            name: req.body.name,
            code: req.body.id,
            puuid: req.body.puuid,
            profileIconId: req.body.profileIcon,
            summonerLevel: req.body.summonerLevel,
            userId: req.user.id
        }
    })
    .then((createdSummoner) =>{
    res.redirect('../profile/summoners')
    })
})

// Route to delete Summoners from faviortes
router.delete('/summoners/:id', (req,res) => {
    db.summoner.destroy({
        where: {
            name: req.body.name,
            code: req.body.code,
            puuid: req.body.puuid,
            profileIconId: req.body.profileIconId,
            summonerLevel: req.body.summonerLevel,
            userId: req.body.userId
        }
    })
    .then((deletedItem)=>{
        res.redirect('/profile/summoners')
    })
    // .catch((error)=>{
    //     res.render('error')
    // })
})

module.exports = router


