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

const ActivityModel = require("./models/Activity.model");
const BookingModel = require("./models/Booking.model");
const HostModel = require("./models/Host.model");
const LodgingModel = require("./models/Lodging.model");
const UserModel = require("./models/User.model");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoute = require("./routes/auth.route");
app.use("/auth", authRoute);

//LODGING ROUTES

// i just imported the models up there and started the routes here. everything else was there before and i haven't touched it :P
//okiiiii, what model should I do ?
// i was going to do activity, so maybe yo can do host
//yaaaay
//well, really anyone you like besides lodging and activity haha
//so we will be able to search for a host ? or only available if you click on his profile on lodging details

//i've only seen it after clicking profile on airbnb. we could start with that -agreed -:D
//get lodgings

app.get("/lodgings", (req, res, next) => {
  LodgingModel.find({})
    .then((lodgings) => {
      //   console.log("lodgings retrieved", lodgings);
      res.json(lodgings);
    })
    .catch((err) => {
      console.log("error while retrieving lodgings", err);
      res.status(500).json({ err: "failed to retrieve lodgings" });
      next(err);
    });
});

//get lodging by Id

app.get("/lodgings/:lodgingId", (req, res, next) => {
  const { lodgingId } = req.params;
  LodgingModel.findById(lodgingId)
    .populate("Host")
    .then((lodById) => {
      res.status(200).json(lodById);
      // console.log("Got one lodging by the Id", lodById);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "error while retrieving lodging by the Id", err });
      console.log("error while retrieving lodging by the Id", err);
      next(err);
    });
});

//lodging  post
app.post("/lodgings", (req, res, next) => {
  LodgingModel.create(req.body)
    .then((newLod) => {
      //   console.log("new lodging added", newLod);
      res.json({ newLod, message: "Your lodging was created!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "error while creating lodging" });
      console.log(err);
      next(err);
    });
});

//lodging delete

app.delete("/lodgings/:lodgingId", (req, res, next) => {
  const { lodgingId } = req.params;
  LodgingModel.findByIdAndDelete(lodgingId)
    .then((delLod) => {
      res.status(200).json(delLod);
      console.log("deleted lodging successfully", delLod);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "error while deleting lodging by the Id", error });
      console.log("error while deleting lodging by the Id", error);
      next(err);
    });
});

//update lodging by id

app.put("/lodgings/:lodgingId", (req, res, next) => {
  const { lodgingId } = req.params;
  LodgingModel.findByIdAndUpdate(lodgingId, req.body, { new: true })
    .then((updatedLodging) => {
      res.status(200).json(updatedLodging);
      console.log("updated by Id", updatedLodging);
    })
    .catch((error) => {
      console.log(error);
      next(err);
    });
});

//Get HOST details

app.get("/lodgings/:hostId", (req, res, next) => {
  const { hostId } = req.params;
  HostModel.findById(hostId)
    .then((hostById) => {
      console.log("Found host by id", hostById);
      res.status(200).json(hostById);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed finding host by id" });
      next(err);
    });
});

//ACTIVITY ROUTES

//get activities
app.get("/activities", (req, res, next) => {
  ActivityModel.find({})
    .then((activity) => {
      res.json(activity);
    })
    .catch((error) => {
      res.status(500).json({ message: "failed to retrieve activity" });
      next(error);
    });
});

//get activity by id
app.get("/activities/:activityId", (req, res, next) => {
  const { activityId } = req.params;
  ActivityModel.findById(activityId)
    .then((foundACtById) => {
      res.status(200).jason(foundACtById);
    })
    .catch((err) => {
      res.status(500).json({ message: "error while retrieving activity", err });
      next(err);
    });
});

//post activity
// app.post("/activities", (req, res, next) => {});
// ActivityModel.create(req.body).then((newActivity) => {
//   res.json({newActivity, message: "activity created successfully"});

// });

//delete activity
//update activity

//BOOKING ROUTES

//do a reservation

app.post("/booking", (req, res, next) => {
  BookingModel.create(req.body)
    .then((newBooking) => {
      console.log("Booking successful ->", newBooking);
      res.status(201).json(newBooking);
    })
    .catch((err) => {
      console.log("There was an error with your booking ->", err);
      res.status(500).json({ message: "Failed booking ->" });
      next(err);
    });
});

//update a reservation

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
