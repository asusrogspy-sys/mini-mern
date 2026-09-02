const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const token = req.cookies.Token

  try {
    if (!token) {
      return res.status(401).json({
        message: 'UnAuthorized'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.userId = decoded.token

    console.log("AUTH USER ID:", req.userId)

    next()

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = authMiddleware