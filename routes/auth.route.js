const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/signup", async (req, res) => {
  const { email, password, userName } = req.body;
  if (email === "" || password === "" || userName === "") {
    res.status(400).json({
      message: "Please provide informations on required fields.",
    });
    return;
  }
  /**Verify if valid email **/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Please provide valid email address." });
    return;
  }

  /**Verify strong pwd **/
  const pwdRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!pwdRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must contain at least 6 characters, one number and one uppercase letter.",
    });
  }
  try {
    /**If user already exists **/
    const foundUser = await UserModel.findOne({ email });
    if (foundUser) {
      res.status(403).json({
        message: "User already exists. You should want to log in instead.",
      });
    } else {
      const theSalt = bcryptjs.genSaltSync(12);
      const hashedPwd = bcryptjs.hashSync(password, theSalt);
      const hashedUser = {
        ...req.body,
        password: hashedPwd,
      };
      const newUser = await UserModel.create(hashedUser);
      res.status(201).json(newUser);
    }
  } catch (err) {
    console.log("Failed signing in", err);
    res.status(500).json({ err });
  }

  /********************************LOGIN***************************************/

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const foundUser = await UserModel.findOne({ email });
      if (!foundUser) {
        res.status(400).json({ message: "User not found, Sign in instead ?" });
      } else {
        const doesPwdMatch = bcryptjs.compareSync(password, foundUser.password);
        if (!doesPwdMatch) {
          res.status(400).json({ message: "Incorrect email or password." });
        } else {
          const { _id, userName } = foundUser;
          const payload = { _id, userName }; //data you want to save
          const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: "HS256",
          });
          res
            .status(200)
            .json({ message: "Successfully logged in", authToken });
        }
      }
    } catch (err) {
      console.log("Error logging in", err);
      res.status(500).json({ message: "Failed logging in" });
    }
  });

  /****************************VERIFY ROUTE***************************************/
  router.get("/verify", isAuthenticated, (req, res) => {
    console.log("Verify route", req.payload);
    res.status(200).json(req.payload);
  });
});

module.exports = router;
