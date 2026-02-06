const dotenv = require('dotenv');
const colors = require('colors');
const app = require('./app/app');

/************************* configure setup *************************/
dotenv.config({path: './configs/config.env', quiet: true});
colors.enabled = true;

/************************* handling Uncaught exceptions *************************/
process.on('uncaughtException', err => {
   console.log(`uncaughtException ERROR: ${err.stack}`.bold.red);
   console.log(`  ➔  Server:  Shutting down the due to Uncaught Exception!`.yellow);
   process.exit(1);
});

/*********************************** variables ***********************************/
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const ADDENDUM = `\t\t...press Ctrl+C to terminate.\n`.bold.white;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost';

/********************************** app listening *********************************/
const server = app.listen(PORT, () => {
   console.log(`  ➔  Server:  Listening at ${BACKEND_URL}:${PORT} in ${NODE_ENV} mode!`.italic.bold.yellow);
   console.log(ADDENDUM);
});

/********************** handling unhandled promise rejection **********************/
process.on('unhandledRejection', err => {
   console.log(`unhandledRejection ERROR: ${err.stack}`.bold.red);
   console.log(`  ➔  Server:  Shutting down due to Unhandled Promise Rejection!`.yellow);
   server.close(() => {
      process.exit(1);
   });
});