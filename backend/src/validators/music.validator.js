const { body } = require("express-validator");

const musicValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Music title is required"),
  
];

module.exports = musicValidator;