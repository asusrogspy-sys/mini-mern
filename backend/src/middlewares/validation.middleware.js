const {validationResult} = require("express-validator")

const checkValidator = (req,res,next) => {
    const reqCheck = validationResult(req)

    if (reqCheck.isEmpty()) {
        next()
    }else{
        return res.status(400).json({
            errors: reqCheck.array()
        })
    }
}

module.exports = checkValidator