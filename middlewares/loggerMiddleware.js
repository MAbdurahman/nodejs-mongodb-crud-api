
const colors = require('colors');
colors.enabled = true;

const logger = function(req, res, next) {
   const currentDate = new Date();
   const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} @ ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`.bold.italic.yellow;

   console.log(`method: ${req.method}  url: ${req.url}  ${res.statusCode} timestamp: ${formattedDate}`.bold.italic.yellow);
   next();
}

module.exports = logger;