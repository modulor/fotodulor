var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var User =  require('./models/user').User;
var session = require('express-session');
var routes_app = require('./routes_app');
var session_middlewares = require('./middlewares/session');

app.set('view engine','jade');
app.use(bodyParser.json()); // peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({
	secret: "$!%%&/QAZWXXEDCRFVTGBqazwsxedcrfv",
	resave: false,
	saveUninitialized: false
}));
app.use('/app',session_middlewares);
app.use('/app', routes_app);

// routes

app.get('/', function(req,res){
	data = {
		user_id: req.session.user_id
	};	
	res.render('index');
});

app.get('/login', function(req,res){
	res.render('login');
});

app.post('/sessions',function(req,res){
	User.findOne({email: req.body.email, password: req.body.password},"nombre email",function(err,user){
		req.session.user_id = user._id;		
		res.redirect('/app');
	});
});

app.get('/registro', function(req,res){
	res.render('registro');
});

app.post('/users', function(req,res){
	
	var user = new User({
		email: req.body.email,
		password: req.body.password,
		password_confirmation: req.body.password_confirmation
	});	

	// normal

	// user.save(function(err, user, numero){
	// 	if(err){						
	// 		res.send(String(err));
	// 	}
	// 	else
	// 		res.send('user saved: '+String(user));		
	// });

	// promises

	user.save().then(function(us){
		res.send('user saved success');
	},function(err){		
		res.send('error: '+String(err));
	});

});

// routes end

app.listen(8080);