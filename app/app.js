const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const logger = require('./../middlewares/loggerMiddleware');
const expressMongoSanitize = require('@exortek/express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

/************************* setup config file *************************/
if (process.env.NODE_ENV !== 'production') {
   dotenv.config({path: './configs/config.env', quiet: true});
}

/***************************** variables *****************************/
const app = express();
colors.enabled = true;

/************************* middlewares *************************/
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressMongoSanitize());
app.use(logger);

/*************************** import all routes ***************************/
const homeRoute = require('../routes/homePageRoute');
const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');


/********************************* routes *********************************/
app.use('/', homeRoute);
app.use('/api/v1.0/auth', authRoutes);
app.use('/api/v1.0/products', productRoutes);


module.exports = app;