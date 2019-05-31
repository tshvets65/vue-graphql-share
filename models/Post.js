const mongoose = require("mongoose");

const Postchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    categories: {
      type: [String],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    messages: [
      {
        messageBody: {
          type: String,
          required: true
        },
        messageDate: {
          type: Date,
          default: Date.now
        },
        messageUser: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User"
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", Postchema);
