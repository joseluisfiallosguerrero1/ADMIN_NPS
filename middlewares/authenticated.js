var jwt = require('jwt-simple');
var moment = require('moment');
//var ensureClient = require('../helpers/ensureClient');
var secret = 'prueba';

exports.ensureAuth = function (req, res, next) {
    var token = req.headers.authorization.replace(/['"]+/g, '');
    console.log(token);
    try {

        var payload = jwt.decode(token, secret);
        console.log(payload);
        var jwtexp = moment(payload.exp).unix();
        console.log(jwtexp);
        if (jwtexp <= moment().unix()) {
            return res.status(401).send({ success: false, message: 'TOKEN HAS EXPIRED' });
        }
    } catch (ex) {
        console.log(ex);
        return res.status(404).send({ success: false, message: 'NO VALID TOKEN' });
        
    }

    req.user = payload;
    next();

};