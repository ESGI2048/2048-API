'use strict' ;

const passport = require('passport/lib') ;
const LocalStrategy = require('passport-local').Strategy;

const authenticationController = require('../controllers').AuthenticationController ;
const userContriller = require('../controllers').UserController;


passport.use(new LocalStrategy(
    {
        usernameField: 'login',
        passwordField: 'password'
    },
    async function(login, password, done) {
        try{
            console.error('LocalStrategy function ') ;
            const user = await authenticationController.getUserByLogin( login ) ;
            if (!user){
                return done(null, false, { message: 'Incorrect login.' }) ;
            }
            if(!user.validPassword(password)){
                return done(null, false, { message : 'Incorrect password.'}) ;
            }
            return done(null, user) ;

        }catch(err){
            return done(err);
        }
    }
));


passport.serializeUser(function(user, done) {
    return done(null, user.id);
});



passport.deserializeUser(async function(id, done) {
    try{
        const user = await userContriller.getOne(id);
        return  done(null, user);
    }catch(err){
        console.err(err) ;
        return done(err, null) ;
    }

});
module.exports = passport ;
