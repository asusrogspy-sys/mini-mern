// user Model
const model = require('../models/user.model.js')
// music Model
const music = require('../models/music.model.js')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  const { username, email, password, role = 'user' } = req.body

  try {
    const user = await model.findOne({
      $or: [{ username }, { email }]
    })

    if (user) {
      return res.status(400).json({
        message: 'User Already exists'
      })
    }

    const hash = await bcrypt.hash(password, 10)

    const userCredentials = await model.create({
      username,
      email,
      password: hash,
      role
    })

    console.log(userCredentials)

    res.status(201).json({
      username: userCredentials.username,
      email: userCredentials.email,
      role: userCredentials.role
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const loginUser = async (req, res) => {
  const { usernameoremail, password, role } = req.body

  try {
    const user = await model.findOne({
      $or: [{ username: usernameoremail }, { email: usernameoremail }]
    })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid Credentials'
      })
    }

    console.log(user)

    const passhash = await bcrypt.compare(password, user.password)

    if (!passhash) {
      return res.status(401).json({
        message: 'Invalid Crediantials'
      })
    }

    const decoded = jwt.sign({ token: user._id }, process.env.JWT_SECRET_KEY)
    console.log(decoded)

    res.cookie('Token', decoded, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })

    res.status(200).json({
      message: 'Login Sucess',
      username: user.username,
      email: user.email,
      role: user.role
    })
  } catch (error) {
    res.status(401).json({
      message: 'Invalid Crediantials'
    })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await model.findOne({
      _id: req.userId
    })

    const musicFind = await music.find()

    const musicUrls = await musicFind.map(items => items.url)

    res.status(200).json({
      username: user.username,
      email: user.email,
      role: user.role,
      _id: user._id,
      music: musicUrls
    })
  } catch (error) {
    res.status(401).json({
      message: error.message
    })
  }
}

module.exports = { registerUser, loginUser, getUser }
