const passport = require('passport');
const User = require('../app/models/user');
const config = require('./auth');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
 
const localOptions = {
    usernameField: 'username'
};
 
const localLogin = new LocalStrategy(localOptions, function(username, password, done){
 
    User.findOne({
        username: username
    }, function(err, user){
        console.log('oops hmm: ', err);
        
        if(err){
            return done(err);
        }
 
        if(!user){
            return done(null, false, {error: 'Login failed. Please try again.'});
        }
 
        user.comparePassword(password, function(err, isMatch){
 
            if(err){
                return done(err);
            }
 
            if(!isMatch){
                return done(null, false, {error: 'Login failed. Please try again.'});
            }
 
            return done(null, user);
 
        });
 
    });
 
});
 
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
};
 
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
 
    User.findById(payload._id, function(err, user){
 
        if(err){
            return done(err, false);
        }
 
        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
 
    });
 
});
 
passport.use(jwtLogin);
passport.use(localLogin);