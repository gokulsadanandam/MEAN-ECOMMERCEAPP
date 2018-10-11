var Cart = require('../app/models/cartmodel');
var Order = require('../app/models/order');

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('login.ejs')
    })

    app.get("/signup", function(req, res) {
        res.render('signup.ejs')

    })


    app.get('/main', isLoggedIn, function(req, res) {
        let usercart = []
        Cart.findOne({
            "loyaltytracker": req.user.loyaltytracker
        }, function(err, data) {
            tracker = data.loyaltytracker
            details = data.cart
            userdetails = {
                'tracker': tracker,
                'details': details
            }
            res.render('main.ejs', {
                user: req.user.firstname + " " + req.user.lastname,
                uid: tracker,
                cart: details
            });

        })

    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }))

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/main',
        failureRedirect: '/',
        failureFlash: true
    }))


    app.post('/api/usercart', isLoggedIn, function(req, res) {

        let data = {
            "loyaltytracker": req.user.loyaltytracker,
            "cart": req.body
        }

        Cart.findOneAndUpdate({
            "loyaltytracker": req.user.loyaltytracker
        }, {
            $set: data
        }, function(err, doc) {
            if (err) throw err;
            res.json(doc)
        })
    })

    app.delete('/api/usercart', isLoggedIn, function(req, res) {

        let data = {
            "loyaltytracker": req.user.loyaltytracker,
            "cart": {
                "item": "0"
            }
        }

        Cart.findOneAndUpdate({
            "loyaltytracker": req.user.loyaltytracker
        }, {
            $set: data
        }, function(err, doc) {
            if (err) throw err;
            res.json(doc)
        })
    })

    app.post('/api/order', isLoggedIn, function(req, res) {

        order = new Order()
        order.loyaltytracker = req.user.loyaltytracker
        order.order = req.body
        order.save()

    })

    app.get('/api/loyalty', function(req, res) {

        Order.find({
            "loyaltytracker": req.user.loyaltytracker
        }, function(err, doc) {
            res.json(doc.length)
        })
    })

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}