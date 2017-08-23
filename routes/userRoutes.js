//require in body-parser, assigning the exported object to a variable named bodyParser://
var bodyParser = require('body-parser')

//Install the body-parser npm package and save it to your dependencies//
//In terminal npm install --save body-parser//

//require in usersControllers.js and assign the exported object to usersControllers//
var usersControllers= require('../controllers/usersControllers')

//Before the usersRoutes function, add://
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//declare a new function named usersRoutes and give it a parameter of app//
var usersRoutes = function(app){
    //in the usersRoutes function, add a new get route handler for /:
    app.get('/', function (req, res) {
        //Inside the route handler, render the template home:
        //in the / get route handler - pass a second argument to res.render with a currentUser property set to req.session.user://
        res.render('home', { currentUser: req.session.user })
        
    })
    //add a new GET route handler for /register and inside the callback, render the register template.//
    app.get('/register', function (req, res) {
        res.render('register')
        
    })

    //Create a new POST route handler for /register in userRoutes.js. Pass urlencodedParser as the second argument,// 
    //usersControllers.register as the third argument//
    //and an anonymous function with req and res parameters as a fourth argument://
    app.post('/register', urlencodedParser, usersControllers.register, function (req, res) {
        //inside the anonymous function callback, redirect to the home page://    
        res.redirect('/')
    })

    //add a new GET route handler for /login and inside the callback, render the login template//
    app.get('/login', function (req, res) {
        res.render('login')
    })

    //Create a new POST route handler for /login in userRoutes.js.//
    //Pass urlencodedParser as the second argument, usersControllers.login as the third argument //
    //and an anonymous function with req and res parameters as a fourth argument://
    app.post('/login', urlencodedParser, usersControllers.login, function (req, res) {
        //inside the anonymous function callback, redirect to the home page://
        res.redirect('/')
    })

    //add a new GET route handler for /logout.//
    //Give it two arguments: usersControllers.logout and an anonymous function with req and res parameters://
    app.get('/logout', usersControllers.logout, function(req,res){
        //Inside the last callback, set req.session.user to false.
        req.session.user = false
        res.redirect('/')   
    
    })

}

//Set the module.exports for the file to the usersRoutes function (but don't call it)//
module.exports = usersRoutes