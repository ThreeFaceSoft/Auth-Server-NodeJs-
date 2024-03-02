const jwt = require('jsonwebtoken');
const [ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN] = require('../config/server.config');
const tokenModel = require('../models/token.model');

const TOKEN_TYPES = {
	REFRESH: 'refresh',
	ACCESS: 'access'
}

class TokenService {
	generateToken(payload, tokenType, expiresIn = null) {
		console.log(`Генерация ${tokenType}Token`);
		const secretKey = () => {
			switch (tokenType) {
				case TOKEN_TYPES.ACCESS: {
					return process.env.JWT_ACCESS_SECRET_KEY
				}
				case TOKEN_TYPES.REFRESH: {
					return process.env.JWT_REFRESH_SECRET_KEY
				}
			}
		};
		const _expiresIn = () => {
			if (expiresIn) return expiresIn
			switch (tokenType) {
				case TOKEN_TYPES.ACCESS: {
					return ACCESS_TOKEN_EXPIRES_IN
				}
				case TOKEN_TYPES.REFRESH: {
					return REFRESH_TOKEN_EXPIRES_IN
				}
			}
		}
		return jwt.sign(payload, secretKey(), {
			expiresIn: _expiresIn()
		});
	}

	generateTokens(payload) {
		console.log('Генерация accessToken');
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
			expiresIn: ACCESS_TOKEN_EXPIRES_IN
		});
		console.log('accessToken создан');
		console.log('Генерация refreshToken');
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
			expiresIn: REFRESH_TOKEN_EXPIRES_IN
		});
		console.log('refreshToken создан');

		return {accessToken, refreshToken}
	}

	async saveToken(userId, refreshToken) {
		const existingToken = await tokenModel.findOne({user: userId});
		if (existingToken) {
			existingToken.refreshToken = refreshToken;
			return existingToken.save();
		}

		return await tokenModel.create({user: userId, refreshToken})
	}
}

module.exports = {tokenService: new TokenService(), TOKEN_TYPES};