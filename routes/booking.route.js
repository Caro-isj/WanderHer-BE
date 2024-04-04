const router = require("express").Router();
const BookingModel = require("./models/Booking.model");

//BOOKING ROUTES

//do a reservation
router.post("/", (req, res, next) => {
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

// get reservation by id

router.get("/:bookingId", (req, res, next) => {
  const { bookingId } = req.params;
  BookingModel.findById(bookingId)
    .then((completeBooking) => {
      console.log("Validated booking ->", completeBooking);
      res.status(200).json(completeBooking);
    })
    .catch((err) => {
      console.log("Error finding that reservation ->", err);
      res.status(500).json({ message });
      next(err);
    });
});

//update a reservation

router.put("/:bookingId", (req, res, next) => {
  const { bookingId } = req.params;
  BookingModel.findByIdAndUpdate(bookingId, req.body, { new: true })
    .then((updatedBooking) => {
      console.log("Reservation updated successfully ->", updatedBooking);
      res.status(201).json(updatedBooking);
    })
    .catch((err) => {
      console.log("Error while updating the reservation ->", err);
      res.status(500).json(err, { message: "Failed updating reservation." });
      next(err);
    });
});

//delete a reservation

router.delete("/:bookingId", (req, res, next) => {
  const { bookingId } = req.params;
  BookingModel.findByIdAndDelete(bookingId)
    .then((deletedBooking) => {
      if (!deletedBooking) {
        res.status(500).json({ message: "No reservation to delete" });
      } else {
        res.status(204).send();
      }
    })
    .catch((err) => {
      console.log("Unable to delete the reservation.", err);
      res.status(500).json({ message: "Failed deleted the reservation." });
    });
});

module.exports = router;
