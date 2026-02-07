/************************* imports *************************/
const colors = require('colors');
const mongoose = require('mongoose');

colors.enable();
mongoose.set('strictQuery', true);

const connectDatabase = async () => {
   try {
      const connect = await mongoose.connect(process.env.MONGO_DB_URI);
      console.log(`  ➔  Database:  Connected to ${connect.connection.host} with mongoose`.cyan.italic.bold);
   } catch (error) {
      console.error(`  ➔  Database:  Error - ${error.message}`.red.italic.bold);
      process.exit(1);
   }
};

module.exports = connectDatabase;