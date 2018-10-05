var express = require('express'),
	app = express(),
	bodyparser = require('body-parser'),
	mongoose  = require('mongoose'),
	passport = require('passport'),
	flash = require('connect-flash'),
	morgan       = require('morgan'),
	cookieParser = require('cookie-parser'),
	session      = require('express-session'),
	configDB = require('./config/database.js')

mongoose.connect(configDB.url,function(err,data){
	console.log("Mongoose Connection Status " + mongoose.connection.readyState)
})

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());

app.set('view engine', 'ejs'); 

app.use(session({ secret: 'codingisawesome' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

require('./app/routes.js')(app, passport);

app.use("/css",express.static(__dirname+"/client/css"))


app.listen(3000)