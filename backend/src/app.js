const express =  require("express")
const authRoutes = require("./routes/auth.route.js")
const cookie = require("cookie-parser")
const musicRoutes = require("./routes/music.route.js")
const albumRoutes = require("./routes/album.route.js")
const cors = require("cors")

const app = express()
app.set("json spaces", 2)
app.use(express.json())
app.use(cookie())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
 
app.use("/api/auth",authRoutes)
app.use("/api/music",musicRoutes)
app.use("/api/album",albumRoutes)

module.exports = app
