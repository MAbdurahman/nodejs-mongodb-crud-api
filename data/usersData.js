
import bcryptjs from 'bcryptjs';

const usersData = [
   {
      fullname: 'John Doe',
      email: 'johndoe@gmail.com',
      password: bcryptjs.hashSync('Aa!2qwer', 10),
      passcode: bcryptjs.hashSync('acc356', 10),
      role: 'admin',
   },
   {
      fullname: 'William Clark',
      email: 'williamclark@gmail.com',
      password: bcryptjs.hashSync('Aa!2qwer', 10),
      passcode: bcryptjs.hashSync('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'James Doe',
      email: 'jamesdoe@gmail.com',
      password: bcryptjs.hashSync('Aa!2qwer', 10),
      passcode: bcryptjs.hashSync('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Benjamin Taylor',
      email: 'benjamintaylor@gmail.com',
      password: bcryptjs.hashSync('Aa!2qwer', 10),
      passcode: bcryptjs.hashSync('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Lucas Moore',
      email: 'lucasmoore@gmail.com',
      password: bcryptjs.hashSync('Aa!2qwer', 10),
      passcode: bcryptjs.hashSync('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Henry Martin',
      email: 'henrymartin@gmail.com',
      password: bcryptjs.hashSync('Aa!2qwer', 10),
      passcode: bcryptjs.hashSync('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Alex Taylor',
      email: 'alextaylor@gmail.com',
      password: bcryptjs.hashSync('Aa!2qwer', 10),
      passcode: bcryptjs.hashSync('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Mary Jane',
      email: 'maryjane@gmail.com',
      password: bcryptjs.hashSync('Aa!2qwer', 10),
      passcode: bcryptjs.hashSync('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Sophia Davis',
      email: 'sophiadavis@gmail.com',
      password: bcryptjs.hashSync('Aa!2qwer', 10),
      passcode: bcryptjs.hashSync('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Jane Doe',
      email: 'janedoe@gmail.com',
      password: bcryptjs.hashSync('Aa!2qwer', 10),
      passcode: bcryptjs.hashSync('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Isabella Brown',
      email: 'isabellabrown@gmail.com',
      password: bcryptjs.hashSync('Aa!2qwer', 10),
      passcode: bcryptjs.hashSync('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Ava Wilson',
      email: 'avawilson@gmail.com',
      password: bcryptjs.hashSync('Aa!2qwer', 10),
      passcode: bcryptjs.hashSync('acc356', 10),
      role: 'user'
   },
   {
      fullname: 'Amelia Garcia',
      email: 'ameliagarcia@gmail.com',
      password: bcryptjs.hashSync('Aa!2qwer', 10),
      passcode: bcryptjs.hashSync('acc356', 10),
      role: 'user'
   }
];

export default usersData;