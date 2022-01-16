require("dotenv").config();
// connect db
require("./config/database");
// init server
const server = require("./config/server");
const routes = require("./config/routes");

routes(server);

server.listen(process.env.PORT || 3001, () => {
  console.log(`server started on port ${process.env.PORT || 3001}`);
});
