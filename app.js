//require in the usersRoutes.js file at the top, and assign the exported object to a new variable named usersRoutes//
var usersRoutes = require('./routes/usersRoutes.js')

var path = require('path')

require('dotenv').config({
  path: path.join(__dirname, 'settings.env')
})

var mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useMongoClient: true
  })

var express = require('express')
var exphbs = require('express-handlebars')
var app = express()

//add a new require for client-sessions and assign the exported object to a variable named sessions.
var sessions = require('client-sessions')

//(don't type the exact same thing for the value for secret - just ensure you have a random string of numbers and letters)://
app.use(sessions({
    cookieName: 'session',
    secret: 'bjbdhbhdbjdbt2782eeyihdigdwuydwqoqo990p'
  }))

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}))

app.set('view engine', '.hbs')

app.use(express.static('public'))

//above the app.listen - call usersRoutes and pass in an argument of app (a.k.a our Express instance)//
usersRoutes(app)

app.listen(3000)