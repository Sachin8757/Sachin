const mongoose = require("mongoose");

const dsaQuestionSchema = new mongoose.Schema(
  {
    leetcodeNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      default: "C++",
    },

    topics: [
      {
        type: String,
        trim: true,
      },
    ],

    leetcodeUrl: {
      type: String,
      trim: true,
    },

    githubUrl: {
      type: String,
      trim: true,
    },

    solvedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const DSAQuestion = mongoose.model("DSAQuestion", dsaQuestionSchema);

module.exports = DSAQuestion;