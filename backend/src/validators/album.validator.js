const { body } = require('express-validator')

const albumValidator = [
  body('title').trim().notEmpty().withMessage('Album title is required'),

  body('songs').optional().isArray().withMessage('Songs must be an array')
]

module.exports = albumValidator
