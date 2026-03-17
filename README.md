# nodejs-mongodb-crud-api

## Description 
<p>nodejs-mongodb-crud-api is a Node.js application connecting to MongoDB, defining
schemas with Mongoose, and implementing CRUD operations with Express.js. Product has 
query functionality with based on 'keyword' and productSchema property 'name'; search
functionality based on 'category', 'price', 'rating'; pagination functionality based
on 'page' and a number value. In order for the middlewares/errorsMiddleware.js to 
operation with its stack trace, in the config.env file, NODE_ENV needs to be in
lowercase, i.e, 'development' or 'production'.</p>

<p>Populate the database with users and products. See "scripts" in package.json</p>

## Features
- Node.js
- Express.js
- MongoDB
- Nodemon
- Colors
- Dotenv
- Middlewares

### Create the config.env file in the backend / config directory
```env
# Useful Variables
PORT=
NODE_ENV='development'
BACKEND_URL='http://localhost'
FRONTEND_URL=
PAGINATION_LIMIT=
CURRENCY="USD"

# MongoDB Setup
MONGO_DB_URI=

# JSON Web Token
JWT_SECRET=
JWT_EXPIRES_TIME='604800000ms'
JWT_LIFETIME='3.1104e10ms'

# Cookie Token
COOKIE_EXPIRES_TIME=21d


```

### Start the app
```shell
npm install
```
or
```shell
yarn or yarn install
```
then
```shell
npm run server
```
or

```shell
yarn server
```

### Run production mode
```shell
npm run prod
```
or

```shell
yarn prod
```

![Image](https://github.com/user-attachments/assets/89d1e9c4-e1ee-4f2a-95eb-dcec7a32e472)