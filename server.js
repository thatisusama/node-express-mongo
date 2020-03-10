const express = require("express");
require('dotenv').config();
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const connectDB = require('./config/db');
const passport = require("passport");
const errorhandler = require('./middleware/error');

const port = process.env.PORT;
var app = express();

connectDB(); // connecting db

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // security to expose headers
app.use(cors()); // cors policy
app.use(mongoSanitize()); // to avoid injections
app.use(morgan('dev')); // logging
app.use(passport.initialize()); // passport setup

require("./config/passport")(passport);

app.get('/', (req, res) => {
  res.send({ message: `Hello World` })
})

// Routes
require("./api/routes")(app);
app.use(errorhandler);

app.listen(port, () => {
  console.log(`Listening on port: ${port} with ENV: ${process.env.NODE_ENV}`);
});