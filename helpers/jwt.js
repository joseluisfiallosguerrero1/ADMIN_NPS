'use strict'

var jwt = require('jwt-simple');
var moment= require('moment');
var secret = 'prueba';

exports.createToken = function(user,sedes){
    var payload = {
        id: user.IdUsuario,
        sedes:sedes,
        iat: moment().unix(),
        exp: moment().add(10800, 'seconds')
    };
    return jwt.encode(payload, secret);
};

exports.returnUser = function(token){
    return jwt.decode(token,secret,false);
};

