var User = require('../models/User')

var usersControllers = {
    login: function (req, res, next) {
        User.login(req.body, function (error, result) {
            if (!error) {
                req.session.user = result
                next()
            }
        })
    },

//When we go to /logout, we want our session to be cleared and then to be redirected back to the homepage, //
//where we should see ourselves no longer logged in.//

//add a new controller with req, res, and next parameters. //
//Inside, set req.session.user to false, and then call next()://
    register: function (req, res, next) {
        User.register(req.body, next)
    }
}

module.exports = usersControllers