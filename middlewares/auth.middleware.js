const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require("../config/server.config");

const authMiddleware = (req, res, next) => {
	console.log('Попытка авторизации');
	const auth = req.headers.authorization;
	console.log('Определение access token');
	const token = auth && auth.split(' ')[1]; //TODO: Нужно скорректировать проверку - добавить слово на b...
	if (!token) {
		console.error('Access token не найден');
		return res.redirect('/login');
		//return res.sendStatus(401);
	}
	console.log(`Access token определен: ${token}`);

	console.log('Верификация access token');
	jwt.verify(token, SECRET_KEY, (error, user) => {
		if (error) {
			console.error(`Ошибка верификации: ${error}`);
			return res.redirect('/login');
			//return res.sendStatus(403);
		}

		console.log(`Верификация пройдена. Пользователь: ${user}`);
		req.user = user;
		next();
	})
}

module.exports = authMiddleware;