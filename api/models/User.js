const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "This username already exists!"],
    },
    email: { type: String, required: true, unique: true },
    imageURL: { type: String, default: "" },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
