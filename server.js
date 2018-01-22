var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var db = require('./models');

var routes = require('./routes/routes.js');

//configure passport
// require('./config/passport')(passport);

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

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Feedback server listening on PORT ${PORT}`);
	});
});
