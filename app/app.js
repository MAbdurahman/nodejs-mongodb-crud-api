const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const logger = require('./../middlewares/loggerMiddleware');

/************************* setup config file *************************/
if (process.env.NODE_ENV !== 'production') {
   dotenv.config({path: './configs/config.env', quiet: true});
}

/***************************** variables *****************************/
const app = express();
colors.enabled = true;

/************************* middlewares *************************/
if(process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'));
   app.use(logger);
}
app.use(express.json());

/*************************** import all routes ***************************/

/********************************* routes *********************************/


module.exports = app;