const mongoose = require('mongoose')

const ConnectDb = async () => {
  await mongoose.connect('mongodb://admin:admin@localhost:27017/miniSpot?authSource=admin')
  console.log('DB Connected')
}

module.exports = ConnectDb
