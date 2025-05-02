const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    orgName:String,
    fileData:Buffer,
    mimeType:String,
    uploadDate:String,
    
})

const File = mongoose.model('file_upload',fileSchema);

module.exports = File;
