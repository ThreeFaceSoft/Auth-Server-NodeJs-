const {Schema, model} = require("mongoose");

const USER_ROLES = {
	USER: 'user',
	ADMIN: 'admin'
}

const userSchema = new Schema({
	email: {
		type: String,
/*		unique: [true, 'email уже используется'],
		lowercase: true,
		trim: true,
		required: [true, 'email не передан'],
		validate: {
			validator: (v) => {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
			},
			message: '{VALUE} не допустимый email'
		}*/
	},
/*	role: {
		type: String,
		enum: [USER_ROLES.USER, USER_ROLES.ADMIN],
		default: 'user',
		required: [true, 'Роль не передана']
	},*/
	password: {
		type: String,
		required: true
	},
/*	created: {
		type: Date,
		default: Date.now
	}*/
})

module.exports = model('User', userSchema);