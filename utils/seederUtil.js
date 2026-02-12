/************************* imports *************************/
const dotenv = require('dotenv');
const colors = require("colors");
const connectDatabase = require('../configs/databaseConfig.js');
const Product = require('../models/productModel');
const User = require('../models/userModel.js');
const products = require('../data/productsData.js');
const users = require('../data/usersData.js');

/************************* configure setup *************************/
dotenv.config({path: '../configs/config.env'});
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