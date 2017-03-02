var mongoose = require ('mongoose');

var Schema = mongoose.Schema;


var userSchema  = new Schema({
	email: {type:String, required: true, unique: true},
	username: {type:String, required: true, unique: true},
	password: {type: String, required: true },
	admin: { type: Boolean, default: false},
	created_at: {type : Date, default: Date.now},
	update_at:Date,
	delated_at:Date,

	meta: {
		first_name : String,
		last_name : String,

	}
}); 

var User  = mongoose.model('User', userSchema);
 module.exports= User;