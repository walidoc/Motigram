var Image = require('../models/image'),
    path = require('path'),
    fs = require('fs'),
    del = require('del');
 
exports.createImage = function(req, res, next){
    var newImage = new Image();
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.desc = req.body.desc
    newImage.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ newImage });
    }); 
}
 
exports.getImages = function(req, res, next){
 
    Image.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
            res.sendStatus(400);
        }
 
        // Manually set the correct URL to each image
        for (let i = 0; i < images.length; i++) {
            var img = images[i];
            img.url = req.protocol + '://' + req.get('host') + '/api/images/' + img._id;
        }
        res.json(images);
    })
 
}

exports.getImage = function(req, res, next){
    
    let imgId = req.params.image_id;
 
    Image.findById(imgId, (err, image) => {
        if (err) {
            res.sendStatus(400);
        }
        // stream the image back by loading the file
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join('../server/uploads', image.filename)).pipe(res);
    })
 
}

exports.deleteImage = function(req, res, next){
    
    let imgId = req.params.image_id;

    Image.findByIdAndRemove(imgId, (err, image) => {
        if (err) {
            res.sendStatus(400);
        }

        del([path.join('../server/uploads', image.filename)]).then(deleted => {
            res.sendStatus(200);
        })
    })
 
}