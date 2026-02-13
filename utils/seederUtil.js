/************************* imports *************************/
import dotenv from 'dotenv';
import colors from 'colors';
import connectDatabase from '../configs/databaseConfig.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import products from '../data/productsData.js';
import users from '../data/usersData.js';

/************************* configure setup *************************/
dotenv.config({path: './configs/config.env'});
colors.enabled = true;

/************************* connect MongoDB *************************/
connectDatabase().then(() => {});

/********************** insert resources to the database **********************/
const insertSeededResources = async () => {
   try {
      await Product?.deleteMany();
      await User?.deleteMany();

      const createdUsers = await User?.insertMany(users);
      const adminUser = createdUsers[0]?._id;

      const createdProducts = products?.map(product => {
         return {
            ...product,
            adminUser: adminUser
         }
      });
      await Product?.insertMany(createdProducts);

      console.log(`  ➔  Seeded Data:  Successfully inserted data to database!`.green.italic);
      process.exit(0);
   } catch (err) {
      console.log(`  ➔  Seeded Data:  Error - ${err.message}`.red.italic);
      process.exit(1);
   }
};

/********************** delete resources from the database **********************/
const deleteSeededResources = async () => {
   try {
      await Product?.deleteMany();
      await User?.deleteMany();

      console.log(`  ➔  Seeded Data:  Successfully deleted data from database!`.green.italic);
      process.exit(0);
   } catch (err) {
      console.log(`  ➔  Seeded Data:  Error - ${err.message}`.red.italic);
      process.exit(1);
   }
};

if (process.argv[2] === '-delete') {
   deleteSeededResources().then(() => {});

} else if (process.argv[2] === '-insert') {
   insertSeededResources().then(() => {});

} else {
   console.log(`➔  Seeded Data: This command requires second argument to be '-delete' or '-insert'!`.yellow.bold.italic);
   process.exit(0);
}