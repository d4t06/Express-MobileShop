const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./src/routes");
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const corsOptions = require("./src/config/corsOptions");

// connect database
require("./src/config/ConnectDB");

// use cookies parser
app.use(cookieParser());

// allow cors
app.use(cors(corsOptions));

//built-in middleware for json
app.use(express.json());

// built-in middleware
app.use(express.urlencoded({ extended: false }));

//use routes
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
