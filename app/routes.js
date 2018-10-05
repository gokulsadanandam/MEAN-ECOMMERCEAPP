module.exports = function(app,passport){

    app.get('/',function(req,res){
        res.render('login.ejs')
    })

    app.get("/signup",function(req,res){
    res.render('signup.ejs')

})


app.get('/main', isLoggedIn, function(req, res) {
        res.render('main.ejs', {
            user : req.user 
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/register',passport.authenticate('local-signup',{
        successRedirect : '/',
        failureRedirect : '/signup',
        failureFlash : true 
    }))

    app.post('/login',passport.authenticate('local-login',{
        successRedirect:'/main',
        failureRedirect:'/',
        failureFlash : true 
    }))
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

