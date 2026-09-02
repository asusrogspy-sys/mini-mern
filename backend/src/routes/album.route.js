const express = require("express")

const authMiddleware = require("../middlewares/auth.middleware")

const {createAlbum, getAlbum , addSongToAlbum} = require("../controllers/album.contoller")

const ablumValidator = require("../validators/album.validator")

const checkValidator = require("../middlewares/validation.middleware")

 


const router = express.Router()

router.post("/create-album",ablumValidator,checkValidator,authMiddleware,createAlbum)

router.post("/add-song-album",authMiddleware,addSongToAlbum)

router.get("/get-album/:id",authMiddleware,getAlbum)

 

module.exports = router
