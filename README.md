# BankApp Backend

Check out the  [Frontend repository](https://github.com/goncalhurtado/banking-app-native) for more details.

> [!TIP]
> Still working on this repo!

## Installation

```
git clone https://github.com/goncalhurtado/bankapp-backend
cd hotel-software-backend
npm install
```

### Start the API

```
npm run dev
```

### Configure Database Connection
Set up the database connection by adding the connection URL to the .env file. Use the following URL template, replacing `username`, `password`, and `dbName` with your MongoDB credentials. 
Also, include the cluster name from your MongoDB database.

## Routes

### User Routes
- `GET /users` - Retrieve all users.
- `POST /user` - Register a new user.
- `DELETE /user/:id` - Delete a user by ID.
- `GET /checkDestination/:destination` - Get user by CVU or alias.
- `POST /login` - User login.

### Test
- `POST /balance/:user` - Create balance by user ID.

### Transaction Routes
- `POST /transaction` - Make a transaction.
- `GET /transactions/:user` - Get transactions by user. (Supports pagination with 'page' and 'limit' parameters)

### Balance Routes
- `GET /balance/:user` - Get balance amount by user.
- `GET /balances` - Retrieve all balances.
- `DELETE /balances/all` - Delete all balance accounts.

### Contact Routes
- `GET /contacts/:user` - Get contacts by user.

### Booking Routes
- `GET /bookings/all` - Retrieve all bookings. (Authenticated)


## Main Technologies

### Main Back-End Framework
- NodeJS

### Additional Frameworks and Implementations

- [**Express**](https://expressjs.com/es/): Fast, minimalist, and flexible web infrastructure for Node.js. 
- [**nodemon**](https://nodemon.io/): Automatically updates your Node server when you make changes to any file.
- [**Bcrypt**](https://www.npmjs.com/package/bcryptjs): Library for encryption.
- [**JWT**](https://jwt.io/): Used for generating authentication tokens.
- [**Mongoose**](https://mongoosejs.com/): Object modeling tool for MongoDB in Node.js.
- [**morgan**](https://www.npmjs.com/package/morgan): Middleware for HTTP request logging in Node.js.
- [**passport**](https://www.passportjs.org/): Used for implementing authentications in Node.js.
- [**dotenv**](https://www.npmjs.com/package/dotenv): Management of environment variables.
- [**cors**](https://www.npmjs.com/package/cors): HTTP access control.
- [**multer**](https://www.npmjs.com/package/multer): File handling in NodeJS.

### Database

- [**MongoDB Atlas**](https://www.mongodb.com/atlas/database): Cloud platform for MongoDB databases.
