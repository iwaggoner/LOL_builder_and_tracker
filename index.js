require('dotenv').config()
const express = require('express')
const app = express()
const parser = require("body-parser")
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const axios = require('axios')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const { response } = require('express')



// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)


// body parser middelware
app.use(express.urlencoded({extended:false}))

// session middleware
app.use(session({
    secret: process.env.SUPER_SECRET_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware (must go AFTER session middleware)
app.use(flash())

// custom middleware
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// controllers middleware 
app.use('/auth', require('./controllers/auth'))


// home route
app.get('/', (req, res)=>{
    res.render('home', {})
})

// profile route
app.get('/profile', isLoggedIn, (req, res)=>{
    
    res.render('profile')
})


app.get('/champs', isLoggedIn, (req, res)=> {
    axios.get("https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json")
    .then(function (response) {
        const arrayOfChamps = Object.getOwnPropertyNames(response.data.data)
        res.render('champs/champ', {champsObj : response.data, champsNames: arrayOfChamps})
    })
    .catch(error =>{
        console.error
    })
})

app.get('/champs/:name', isLoggedIn, (req, res)=>{
    const name = req.params.name
    axios.get("https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json")
    .then(function (response) {
        res.render('champs/names', {champsObj : response.data, name: name})
    })
    .catch(error =>{
        console.error
    })
})

app.get('/items', isLoggedIn, (req, res) => {

    axios.get("https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/item.json")
    .then(function (response) {
        const arrayOfItems = Object.getOwnPropertyNames(response.data.data)
        res.render('items/items', {itemsObj: response.data.data, name: arrayOfItems})

    })
    .catch(error =>{
        console.error
    })
})

app.get('/items/:id', isLoggedIn, (req, res) => {

    axios.get("https://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/item.json")
    .then(function (response) {
        const id = req.params.id
        res.render('items/show', {itemsObj: response.data.data, id: id})

    })
    .catch(error =>{
        console.error
    })
})

app.get('/summoner', isLoggedIn, (req, res) =>{
    res.render('summoners/search')
})

app.get('/summoner/results', isLoggedIn, (req, res) => {
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


app.listen(3000, ()=>{
    console.log(`process.env.SUPER_SECRET_SECRET ${process.env.SUPER_SECRET_SECRET}`)
    console.log("auth_practice running on port 3000")
})