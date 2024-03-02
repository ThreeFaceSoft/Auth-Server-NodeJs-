const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const tokenService = require('./token.service').tokenService;
const TOKEN_TYPES = require('./token.service').TOKEN_TYPES;

class UserService {
	async registration(email, password){
		try {
			console.log(`Поиск существующего пользователя c почтой ${email}`)
			const existingUser = await UserModel.findOne({email});
			if (existingUser) {
				new Error(`Пользователь с email ${email} уже существует`)
			}
			console.log('Пользователь не найден');
			console.log('Хеширование пароль');
			const hashPassword = await bcrypt.hash(password, 3)
			console.log('Создание нового пользователя');
			console.log(hashPassword)
			const user = await UserModel.create({email, password: hashPassword})
			const userPayload = {id: user._id, email: user.email};
			console.log(`Пользователь ${user._id} успешно создан`);
			console.log(`Генерация accessToken для ногового пользователя`);
			const accessToken = tokenService.generateToken({user: email}, TOKEN_TYPES.ACCESS);
			console.log(`Генерация refreshToken для нового пользователя`);
			const refreshToken = tokenService.generateToken({email}, TOKEN_TYPES.REFRESH);
			return {userPayload, accessToken, refreshToken}
		} catch (e) {
			throw new Error(e)
		}




/*		const hashPassword = bcrypt.hash(password, 3);
		console.log('Запрос на создание пользоватля в БД')
		const user = await UserModel.create({email, password: hashPassword});
		console.log('Пользователя создан')
		const userPayload = {id: user._id, email: user.email};
		console.log('Попытка создания токенов доступа')
		const tokens = tokenService.generateTokens(tokenPayload);
		return userPayload*/
	}
}

module.exports = new UserService();