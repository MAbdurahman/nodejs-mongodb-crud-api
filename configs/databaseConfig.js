/************************* imports *************************/
import colors from 'colors';
import mongoose from 'mongoose';

colors.enable();
mongoose.set('strictQuery', true);

const connectDatabase = async () => {
   try {
      const connect = await mongoose.connect(process.env.MONGO_DB_URI);
      console.log(`  ➔  MongoDB:  Connected to ${connect.connection.name} with mongoose`.cyan.italic.bold);
   } catch (error) {
      console.error(`  ➔  MongoDB:  Error - ${error.message}`.red.italic.bold);
      process.exit(1);
   }
};

export default connectDatabase;