const ImageKit = require("@imagekit/nodejs")

const client = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
})

const upload = async (fileBuffer) => {

    const response = await client.files.upload({
        file: fileBuffer.toString("base64"),
        fileName: `mini-spot-${Date.now()}`,
        folder:"mini-spot"
    })   
    console.log(response)
    return response
}

const delKit = async(fileId) => {
    const res = await client.files.delete(fileId)
    
    return res
}

module.exports =  {upload , delKit}



