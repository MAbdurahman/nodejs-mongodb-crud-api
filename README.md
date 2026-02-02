# nodejs-mongodb-crud-api

## Description 
<p>nodejs-mongodb-crud-api is a Node.js application connecting to MongoDB, defining
schemas with Mongoose, and implementing CRUD operations with Express.js</p>

## Features
- Node.js
- Express.js
- MongoDB
- Nodemon
- Colors
- Dotenv
- Authentication and Authorization with JWT
- Middlewares
- Postman Collection

### Create the config.env file in the backend / config directory
```env
# Useful Variables
PORT=
NODE_ENV=
BACKEND_URL=
FRONTEND_URL=
PAGINATION_LIMIT=
CURRENCY="USD"

# MongoDB Setup
MONGO_DB_URI=

# JSON Web Token
JWT_SECRET=
JWT_EXPIRES_TIME=
JWT_LIFETIME='400d'

# Cloudinary Setup


# Stripe Setup


# Razorpay Setup


# Miscellaneous
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