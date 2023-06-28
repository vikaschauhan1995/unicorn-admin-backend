require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user.js');
const permissionRouter = require('./routes/permission.js');

// express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors({
  origin: `${process.env.FRONT_END_URL}`
}));

// routes
app.use('/api/user', userRouter);
app.use('/api/permission', permissionRouter);

// connect to db
mongoose.connect(process.env.MONGO_DB).then(() => {
  // listen for request
  app.listen(process.env.PORT, () => {
    console.log(`Connected to mongodb & listening to the port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.log(err);
});