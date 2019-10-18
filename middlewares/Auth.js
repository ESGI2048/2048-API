const localStorage = require('localStorage');

exports.verifyAuth = function(req, res, next) {

    const login = localStorage.getItem('login') ;

    if (!req.user && login == null ){
        return res.sendStatus(403) ;
    }

    next() ;
}
