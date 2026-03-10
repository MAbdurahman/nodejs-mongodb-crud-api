
import express from 'express';
import HomePage from './../pages/homePage.js';

/************************* variables *************************/
const homeRouter = express.Router();

/*************************** route ***************************/
homeRouter.get('/', (req, res) => {
   res.send(HomePage());
});

export default homeRouter;