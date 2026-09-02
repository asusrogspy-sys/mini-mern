const music = require('../models/music.model')
const user = require('../models/user.model')
const { upload, delKit } = require('../services/storage.service')

const uploadMusic = async (req, res) => {
  try {
    const userFind = await user.findById(req.userId)

    if (!userFind) {
      return res.status(403).json({
        message: 'user not found'
      })
    }

    if (userFind.role !== 'artist') {
      return res.status(403).json({
        message: 'Only artist can upload music'
      })
    }

    const file = req.file

    const uploadMusic = await upload(file.buffer)
    console.log(uploadMusic)

    const musicDb = await music.create({
      title: req.body.title,
      url: uploadMusic.url,
      artist: userFind._id,
      fileId: uploadMusic.fileId
    })

    console.log(musicDb)

    res.status(201).json({
      message: 'music uploaded successfully',
      music: musicDb
    })
  } catch (error) {
    res.status(401).json({
      message: error.message
    })
  }
}

const getAllSongs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5

    const skip = (page - 1) * limit

    const search = req.query.search || ''

    const getmusic = await music
      .find({
        title: { $regex: search, $options: 'i' }
      })
      .skip(skip)
      .limit(limit)

    res.status(200).json({
      message: 'All Songs ',
      page: page,
      limit: limit,
      skip: skip,
      music: getmusic
    })

    console.log("PAGE:", page)
console.log("SEARCH:", search)
console.log("SKIP:", skip)
console.log("MUSIC:", getmusic)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const getSongbyId = async (req, res) => {
  try {
    const musicId = req.params.id

    const musicParamId = await music.findById(musicId).populate("artist")

    if (!musicParamId) {
      return res.status(404).json({
        message: 'Not Found'
      })
    }

    res.status(200).json({
      message: 'Music Found By Id',
      music: musicParamId
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const songUpdatebyId = async (req, res) => {
  try {
    const updateBody = req.params.id

    const musicFile = req.file
    console.log(musicFile)

    const updateUsers = await music.findById(updateBody)

    if (!updateUsers) {
      return res.status(404).json({
        message: 'Not Found'
      })
    }

    const updateData = {}

    if (req.body.title) {
      updateData.title = req.body.title
    }

    if (req.file) {
      const uploadFile = await upload(musicFile.buffer)
      updateData.url = uploadFile.url
    }

    const updateById = await music.findByIdAndUpdate(
      updateBody,
      updateData,

      { returnDocument: 'after' }
    )

    res.status(200).json({
      message: 'Updated Successfull',
      music: updateById
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const deleteUserbyId = async (req, res) => {
  try {
    const delParamId = req.params.id

    const musdel = await music.findById(delParamId)

    if (!musdel) {
      return res.status(404).json({
        message: 'Music Id Not Found'
      })
    }

    await delKit(musdel.fileId)

    const musicID = await music.findByIdAndDelete(delParamId)

    console.log(delKit)
    console.log(musicID)

    if (!musicID) {
      return res.status(404).json({
        message: 'Id not Found'
      })
    }

    res.status(200).json({
      message: 'Delete SucessFully'
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  uploadMusic,
  getAllSongs,
  getSongbyId,
  songUpdatebyId,
  deleteUserbyId
}
