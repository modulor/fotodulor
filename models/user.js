var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/fotodulor');

var gender_values = ["Masculino","Femenino"];

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Email no valido"];

var password_validation = {
	validator: function(p){
		return this.password_confirmation == p;
	},
	message: "Las contraseñas no son iguales..."
};

var user_schema = new Schema({
	email: {
		type: String,
		required: "El email es obligatorio",
		match: email_match
	},
	nombre: {
		type: String,
		maxlength: [255,"El Nombre es muy grande"]
	},
	password: {
		type: String,
		minlength: [5, "El password es muy corto, debe ser mayor a 5 caracteres"],
		validate: password_validation
	},
	edad: {
		type: Number,
		min: [5,"La edad no puede ser menor que 5"],
		max: [99,"La edad no puede ser mayor que 99"]
	},
	fecha_nacimiento: Date,
	gender: {
		type: String,
		enum: {
			values: gender_values,
			message: "Opcion no valida"
		}
	}
});

user_schema.virtual('password_confirmation').get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});

var User = mongoose.model('User',user_schema);

module.exports.User = User;

/* tipos de datos en mongodb
String
Number
Date
Buffer
Boolean
Mixed
Objectid
Array
*/