require("dotenv").config()
const app = require("./src/app.js")
const ConnectDb = require("./src/db/db.js")

ConnectDb()

app.listen(8000,()=>{
    console.log("server is running on port 8000")
})
