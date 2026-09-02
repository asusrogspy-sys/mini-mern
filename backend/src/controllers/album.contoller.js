const user = require('../models/user.model')
const Album = require('../models/album.model')
const music = require('../models/music.model')

const createAlbum = async (req, res) => {
  try {
    console.log('USER ID:', req.userId)
    const { title, songs = [] } = req.body

    const userdb = await user.findById(req.userId)

    if (!userdb) {
      return res.status(404).json({
        message: 'Unauthrized'
      })
    }

    if (userdb.role !== 'artist') {
      return res.status(403).json({
        message: 'Album Create only Artist'
      })
    }

    const musicdb = await music.find({
      _id: { $in: songs },
      artist: req.userId
    })

    if (songs.length !== musicdb.length) {
      return res.status(404).json({
        message: 'Song not Available'
      })
    }

    const artistAlbum = await Album.create({
      title: title,
      songs: songs,
      artist: req.userId
    })

    res.status(201).json({
      message: 'Album Create Successfully',
      albumId: artistAlbum._id,
      title: artistAlbum.title,
      songs: artistAlbum.songs,
      artist: artistAlbum.artist
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}

const addSongToAlbum = async (req, res) => {
  const { albumId, songId } = req.body

  try {
    const albumData = await Album.findById(albumId)

  if (!albumData) {
    return res.status(404).json({
      message: 'Album not found'
    })
  }

  if (albumData.artist.toString() !== req.userId) {
    return res.status(404).json({
      message: 'Not Your Album'
    })
  }

  const musicID = await music.findById(songId)

  if (musicID.artist.toString() !== req.userId) {
    return res.status(404).json({
      message: 'Not Your Song'
    })
  }

  if (albumData.songs.includes(songId)) {
  return res.status(400).json({
    message: 'Song already exists in album'
  })
}
  
  albumData.songs.push(songId)

  await albumData.save()
  
  res.status(200).json({
    message: "Song Added To Album",
      albumId: albumData._id,
      songId: songId
    })
    
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }

}

const getAlbum = async (req, res) => {
  try {
    const albumId = req.params.id

    const albumdb = await Album.findById(albumId).populate('songs')

    if (!albumdb) {
      return res.status(404).json({
        message: 'album not found'
      })
    }

    res.status(200).json({
      message: 'Album Fetched',
      title: albumdb.title,
      songs: albumdb.songs,
      artist: albumdb.artist
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}

module.exports = { createAlbum, addSongToAlbum, getAlbum }
