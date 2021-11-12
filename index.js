require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const fs = require('fs')
const champData = fs.readFileSync('11.22.1/data/en_US/champion.json')
const champs = JSON.parse(champData)
const itemData = fs.readFileSync('11.22.1/data/en_US/item.json')
const items = JSON.parse(itemData)


// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.use(express.static('public'));

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
    const arrayOfChamps = Object.getOwnPropertyNames(champs.data)

    res.render('champs/champ', {champsObj : champs, champsNames: arrayOfChamps})
})

app.get('/champs/:name', isLoggedIn, (req, res)=>{
    const name = req.params.name
    res.render('champs/names', {champsObj : champs, name: name})
    console.log(champs.data[name])
})


app.listen(3000, ()=>{
    console.log(`process.env.SUPER_SECRET_SECRET ${process.env.SUPER_SECRET_SECRET}`)
    console.log("auth_practice running on port 3000")
})