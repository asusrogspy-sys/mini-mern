const express = require("express")
const upload = require("../middlewares/upload.middleware")
const authMiddleware = require("../middlewares/auth.middleware")

const {uploadMusic,getAllSongs,getSongbyId,songUpdatebyId,deleteUserbyId} = require("../controllers/music.controller")

const musicValidator = require("../validators/music.validator")

const checkValidator = require("../middlewares/validation.middleware")

const router = express.Router()

// router.post("/upload",musicValidator,checkValidator,authMiddleware,upload.single("music"),uploadMusic)

router.post(
  "/upload",
  authMiddleware,
  upload.single("music"),
  musicValidator,
  checkValidator,
  uploadMusic
)

 router.get("/getAll-songs",getAllSongs)

router.get("/get-music/:id",getSongbyId)

router.patch("/song-update/:id",authMiddleware,upload.single("music"),songUpdatebyId)

router.delete("/song-delete/:id",authMiddleware,deleteUserbyId)

module.exports = router



