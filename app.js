// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

//MODELS

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoute = require("./routes/auth.route");
app.use("/auth", authRoute);

const bookingRoutes = require("./routes/booking.route");
app.use("/booking", bookingRoutes);

const lodgingRoutes = require("./routes/lodging.route");
app.use("/lodging", lodgingRoutes);

const chatRoutes = require("./routes/chat.route");
app.use("/chat", chatRoutes);

const activityRoutes = require("./routes/activity.route");
app.use("/activity", activityRoutes);

const userRoutes = require("./routes/user.route");
app.use("/user", userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
