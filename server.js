"use strict"; //For use with ES6

require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const morgan = require("morgan");
const history = require("connect-history-api-fallback");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const compression = require("compression");
const { db } = require("./api/config/connection");
const { verifyUser } = require("./api/middlewares/utils/auth-util");

const swaggerUi = require("swagger-ui-express");
const routes = require("./api/routes/main-route");
// const swaggerDocument = require('./swagger.json');
const { APP_ENV, PORT } = process.env;

const memoryStore = new session.MemoryStore();
app.use(
  session({
    secret: "a",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

app.use(compression());
app.use(morgan("dev")); // log with Morgan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));
app.use(methodOverride());
app.use(cors()); //enable CORS`

//Mount our route file that we have yet to create.
if (APP_ENV === "production") {
  app.use(history());
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.use("/", (req, res, next) => {
    if (!req.url) {
      res.sendFile(path.join(__dirname + "../client/build/index.html"));
    } else {
      next();
    }
  });
}

// app.get('/api/check', keycloak.checkSso(),  (req, res) => {
//     res.json({message: 'login'});
//   });

app.use("/api", routes);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
if (APP_ENV === "development") {
  app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
}

// development error handler
if (APP_ENV === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

// // production error handler
if (APP_ENV === "production") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: {},
    });
  });
}

server.listen(PORT, async () => {
  db.authenticate()
    .then(() => {
      console.log("Database connection success");
    })
    .catch((error) => console.log("Database connection error", error));
  console.log("Server listening at port 5000");
});


module.exports = app;
