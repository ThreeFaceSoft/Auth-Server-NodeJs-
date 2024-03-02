const userService = require('../service/user.service');

class AuthController {
	async signUp(req, res, next) {
		try {
			const {email, password} = req.body;
			console.log('Попытка регистрации нового пользователя');
			const userData = await userService.registration(email, password);
			console.log(userData);
			console.log('Сохранение refreshToken в cookies');
			res.cookies('refreshToken', 'TEST', {httpOnly: true, secure: true, maxAge: 604800000})
			console.log(`Регистрация ${userData} прошла успешно`);
			return res.json(userData.id)
		} catch (e) {

		}
	}

	async signIn() {
		try {

		} catch (e) {

		}
	}

	async signOut() {
		try {

		} catch (e) {

		}
	}
}

module.exports = new AuthController();