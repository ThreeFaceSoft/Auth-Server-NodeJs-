// const http = require('http');
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const logger = require('./utils/logger');

const authRouter = require('./routes/auth.route');
// const logger = require('morgan');
// const path = require('path');
// const authMiddleware = require("./middlewares/auth.middleware");

const PORT = process.env.PORT || 3000;

const server = express();

server.use(cookieParser());
server.use(express.json()); //parse requests of content-type - application/json
server.use(cors());

server.use('/auth', authRouter);


(async () => {
	try {
		console.log('Конфигурация БД');
		process.env.DEVELOP_MODE && mongoose.set('debug', true);
		console.log(`Попытка подключения к БД`);
		const mongodbClient = await mongoose.connect(process.env.MONGODB_URL, {
			socketTimeoutMS: 5000
		});
		console.log('Подключение к БД установлено')
		server.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
	} catch (e) {
		console.log(e);
	}
})()

