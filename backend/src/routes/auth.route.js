const express = require("express");
// Controller
const {registerUser,loginUser,getUser} = require("../controllers/auth.controller")

// Middleware
const authmiddleware = require("../middlewares/auth.middleware.js")

const {registerValidator,loginValidator} = require("../validators/user.validator.js")
const checkValidator = require("../middlewares/validation.middleware")

const router = express.Router();

router.post("/register",registerValidator,checkValidator,registerUser)
router.post("/login",loginValidator,checkValidator,loginUser)
router.get("/",authmiddleware,getUser)
 

module.exports = router

