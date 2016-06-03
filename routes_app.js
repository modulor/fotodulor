var express = require('express');

var router = express.Router();

// direccion.com/app/

router.get('/', function(req, res){

	res.render('app/home');

});

/* REST */

// formulario de nueva imagen

router.get('/imagenes/new',function(req, res){

	res.render('app/imagenes/new');

});

// formulario editar imagen

router.get('/imagenes/:id/editar',function(req, res){

});

// imagen individual

router.route('/imagenes/:id')
	.get(function(req, res){

	})
	.put(function(req, res){

	})
	.delete(function(req, res){

	});

// lista de imagenes

router.route('/imagenes')
	.get(function(req, res){

	})
	.post(function(req, res){

	});

module.exports = router;