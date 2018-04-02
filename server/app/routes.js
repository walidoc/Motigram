const AuthenticationController = require('./controllers/authentication'), 
    ImageController = require('./controllers/images'), 
    express = require('express'),
    passportService = require('../config/passport'),
    multer = require('multer'),
    passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../server/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});       
const upload = multer({ storage: storage });

module.exports = function(app){
 
    const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        imageRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
 
    // Todo Routes
    apiRoutes.use('/images', imageRoutes);
 
    imageRoutes.get('/', requireAuth, ImageController.getImages);
    imageRoutes.post('/', upload.single('image'), ImageController.createImage);
    imageRoutes.get('/:image_id', ImageController.getImage);
    imageRoutes.delete('/:image_id', requireAuth, ImageController.deleteImage);
 
    // Set up routes
    app.use('/api', apiRoutes);
 
}