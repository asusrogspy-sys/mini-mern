const mongoose = require('mongoose')

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    url: {
      type: String,
      required: true
    },

    fileId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const musicModel = mongoose.model('Music', musicSchema)

module.exports = musicModel
