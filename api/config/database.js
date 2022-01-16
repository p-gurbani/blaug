const mongoose = require("mongoose");

class Connection {
  constructor() {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("DB connection successful"))
      .catch((err) => console.log("DB connection error", err));
  }
}

module.exports = new Connection();
