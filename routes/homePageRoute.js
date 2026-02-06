const express = require('express');
const HomePage = require('./../pages/HomePage');

/************************* variables *************************/
const homeRouter = express.Router();

/*************************** route ***************************/
homeRouter.get('/', (req, res) => {
   res.send(HomePage());
});

module.exports = homeRouter;