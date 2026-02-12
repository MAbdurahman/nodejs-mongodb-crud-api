const bcrypt = require("bcrypt");

const usersData = [
   {
      fullname: 'John Doe',
      email: 'johndoe@gmail.com',
      password: bcrypt.hash('Aa!2qwer', 10),
      passcode: bcrypt.hash('acc356', 10),
      role: 'admin',
   },
   {
      fullname: 'William Clark',
      email: 'williamclark@gmail.com',
      password: bcrypt.hash('Aa!2qwer', 10),
      passcode: bcrypt.hash('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'James Doe',
      email: 'jamesdoe@gmail.com',
      password: bcrypt.hash('Aa!2qwer', 10),
      passcode: bcrypt.hash('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Benjamin Taylor',
      email: 'benjamintaylor@gmail.com',
      password: bcrypt.hash('Aa!2qwer', 10),
      passcode: bcrypt.hash('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Lucas Moore',
      email: 'lucasmoore@gmail.com',
      password: bcrypt.hash('Aa!2qwer', 10),
      passcode: bcrypt.hash('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Henry Martin',
      email: 'henrymartin@gmail.com',
      password: bcrypt.hash('Aa!2qwer', 10),
      passcode: bcrypt.hash('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Alex Taylor',
      email: 'alextaylor@gmail.com',
      password: bcrypt.hash('Aa!2qwer', 10),
      passcode: bcrypt.hash('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Mary Jane',
      email: 'maryjane@gmail.com',
      password: bcrypt.hash('Aa!2qwer', 10),
      passcode: bcrypt.hash('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Sophia Davis',
      email: 'sophiadavis@gmail.com',
      password: bcrypt.hash('Aa!2qwer', 10),
      passcode: bcrypt.hash('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Jane Doe',
      email: 'janedoe@gmail.com',
      password: bcrypt.hash('Aa!2qwer', 10),
      passcode: bcrypt.hash('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Isabella Brown',
      email: 'isabellabrown@gmail.com',
      password: bcrypt.hash('Aa!2qwer', 10),
      passcode: bcrypt.hash('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Ava Wilson',
      email: 'avawilson@gmail.com',
      password: bcrypt.hash('Aa!2qwer', 10),
      passcode: bcrypt.hash('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Amelia Garcia',
      email: 'ameliagarcia@gmail.com',
      password: bcrypt.hash('Aa!2qwer', 10),
      passcode: bcrypt.hash('acc356', 10),
      role: 'user'
   },





];

module.exports = usersData;