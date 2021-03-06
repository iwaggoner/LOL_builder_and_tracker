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
const methodOverride = require('method-override')


// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))


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
app.use('/profile', require('./controllers/profile'))
app.use('/champs', require('./controllers/champs'))
app.use('/items', require('./controllers/items'))
app.use('/summoner', require('./controllers/summoners'))
app.use('/summoner-info', require('./controllers/summonerInfo'))
app.use('/builder', require('./controllers/builder'))


// home route
app.get('/', (req, res)=>{
    res.render('home',)
})


app.listen(process.env.PORT || 3000, ()=>{
   
})