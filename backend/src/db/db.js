const mongoose = require('mongoose')

const ConnectDb = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('DB Connected')
}

module.exports = ConnectDb