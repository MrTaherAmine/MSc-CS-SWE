// Load environment variables from the private .env file.
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies.
app.use(express.json());

/**
 * GET /
 * Simple route used to verify that the API server is running.
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "REST API Checkpoint is running.",
    endpoints: {
      getAllUsers: "GET /users",
      addUser: "POST /users",
      updateUser: "PUT /users/:id",
      deleteUser: "DELETE /users/:id"
    }
  });
});

/**
 * GET /users
 * Return all users stored in MongoDB.
 */
app.get("/users", async (req, res) => {
  try {
    // Mongoose find() returns every document that matches the query.
    const users = await User.find();

    res.status(200).json({
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve users.",
      error: error.message
    });
  }
});

/**
 * POST /users
 * Add a new user to the database.
 */
app.post("/users", async (req, res) => {
  try {
    // Create a new Mongoose document from the request body.
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    });

    res.status(201).json({
      message: "User created successfully.",
      data: user
    });
  } catch (error) {
    // MongoDB duplicate-key errors commonly use code 11000.
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A user with this email already exists."
      });
    }

    res.status(400).json({
      message: "Unable to create user.",
      error: error.message
    });
  }
});

/**
 * PUT /users/:id
 * Edit a user by MongoDB ObjectId.
 */
app.put("/users/:id", async (req, res) => {
  try {
    // Validate the id before sending the query to MongoDB.
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid user id."
      });
    }

    // Only fields provided in the request are updated.
    const updates = {};

    if (req.body.name !== undefined) {
      updates.name = req.body.name;
    }

    if (req.body.email !== undefined) {
      updates.email = req.body.email;
    }

    if (req.body.age !== undefined) {
      updates.age = req.body.age;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        // Return the updated document.
        new: true,

        // Apply schema validation during the update.
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    res.status(200).json({
      message: "User updated successfully.",
      data: updatedUser
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A user with this email already exists."
      });
    }

    res.status(400).json({
      message: "Unable to update user.",
      error: error.message
    });
  }
});

/**
 * DELETE /users/:id
 * Remove a user from MongoDB by ObjectId.
 */
app.delete("/users/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid user id."
      });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    res.status(200).json({
      message: "User deleted successfully.",
      data: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete user.",
      error: error.message
    });
  }
});

/**
 * Handle unknown routes.
 */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found."
  });
});

/**
 * Start the server only after MongoDB is connected.
 */
async function startServer() {
  if (!process.env.MONGO_URI) {
    console.error(
      "MONGO_URI is missing. Copy .env.example to .env and configure it."
    );
    process.exit(1);
  }

  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
