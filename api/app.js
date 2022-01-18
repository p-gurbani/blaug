require("dotenv").config();
// connect db
require("./config/database");
const path = require("path");
// init server
const server = require("./config/server");
const routes = require("./config/routes");

routes(server);

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

server.listen(process.env.PORT || 3001, () => {
  console.log(`server started on port ${process.env.PORT || 3001}`);
});
