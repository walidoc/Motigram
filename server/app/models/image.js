var mongoose = require('mongoose');
 
var ImageSchema = new mongoose.Schema({
 
    filename: {
        type: String
    },
    originalName: {
        type: String
    },
    desc: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        default: 'walidoc'
    }

});
 
module.exports = mongoose.model('Image', ImageSchema);