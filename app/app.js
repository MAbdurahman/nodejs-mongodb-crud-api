import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';
import logger from './../middlewares/loggerMiddleware.js';
import expressMongoSanitize from '@exortek/express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import errorsMiddleware from './../middlewares/errorsMiddleware.js';

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
import homeRoute from '../routes/homePageRoute.js';
import authRoutes from '../routes/authRoutes.js';
import productRoutes from '../routes/productRoutes.js';

/********************************* routes *********************************/
app.use('/', homeRoute);
app.use('/api/v1.0/auth', authRoutes);
app.use('/api/v1.0/products', productRoutes);

/*************************** errors middleware ****************************/
app.use(errorsMiddleware);

export default app;