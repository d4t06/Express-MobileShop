const whiteList = ["http://localhost:3001"];

const corsOptions = {
   origin: (origin, callback) => {
      if (whiteList.indexOf(origin) !== -1 || !origin) {
         callback(null, true);
      } else {
         callback(new Error("not allowed by cors"));
      }
   },
   optionsSuccessStatus: 200,
};

module.exports = { corsOptions };
