const mongoose = require("mongoose");

/**
 * User schema used by the REST API.
 *
 * name  : required user name
 * email : required and unique email
 * age   : optional non-negative number
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true
    },

    age: {
      type: Number,
      min: [0, "Age cannot be negative"]
    }
  },
  {
    // Adds createdAt and updatedAt automatically.
    timestamps: true
  }
);

// Export the model so it can be used in Server.js.
module.exports = mongoose.model("User", userSchema);
