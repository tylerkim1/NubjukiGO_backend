require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// const port = process.env.PORT || 4500;
const port = 80;

const app = express();
// Static File Service
app.use(express.json());

const userRouter = require('./src/routes/user');
const growRouter = require('./src/routes/grow');
const mapRouter = require('./src/routes/map');
const petRouter = require('./src/routes/pet');
const locationRouter = require('./src/routes/location');
app.use('/user', userRouter);
app.use('/grow', growRouter);
app.use('/map', mapRouter);
app.use('/pet', petRouter);
app.use('/location', locationRouter);

// Node의 native Promise 사용
mongoose.Promise = global.Promise;

// Connect to MongoDB
const OMongooseOption = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect( process.env.MONGO_URI, OMongooseOption )
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));
  
app.listen(port, () => console.log(`Server listening on port ${port}`));