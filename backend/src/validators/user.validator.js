 const { body } = require("express-validator")

const registerValidator = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("role")
        .optional()
        .isIn(["user", "artist"])
        .withMessage("Role must be either user or artist")
]

const loginValidator = [
    
    body("usernameoremail")
        .optional()
        .trim(),
 

    body("password")
        .notEmpty()
        .withMessage("Password is required")
]

module.exports = {
    registerValidator,
    loginValidator
}