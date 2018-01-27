var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var db = require('./models');

var PORT = process.env.PORT || 3000;

var app = express();

//middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//middleware passport
app.use(session({ secret: 'bootcamp', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

var routes = require('./routes/routes.js');

//passport config
require('./config/passport.js')(passport, db.User);

//allow CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//static
app.use(express.static('public'));

//routes
app.use(routes);

//404 redirect to root
app.use((req, res, next) => {
	res.status(404).redirect('/');
});

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Feedback server listening on PORT ${PORT}`);
	});
});
