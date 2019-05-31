const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String
    },

    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      require: true,
      ref: "Post"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
