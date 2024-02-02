const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
const userRouter = require('./routes/user');
const tasksRouter = require('./routes/task');

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.json("Hello World");
});

const auth = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Include the original URL as a query parameter
    return res.redirect(`/?redirect=${encodeURIComponent(req.originalUrl)}`);
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decoded = JWT.verify(token, process.env.SECRET);

    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    return res.sendStatus(401);
  }
};


server.use("/user", userRouter.router);
server.use('/task', auth, tasksRouter.router);


server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

const Port = 5000;

server.listen(Port, () => {
  connect();
  console.log("Server is running on port 5000");
});
