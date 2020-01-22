'user strict';


var jwt = require('../helpers/jwt');
const models = require('../Models');
var usuarios = models.Usuarios
var sedesusuarios = models.SedesUsuarios
exports.usuario = {
    login: function (usuario, contrasena) {
        var p = new Promise(function (resolve, reject) {
            const usuas = usuarios.findOne({
                where: {
                    Usuario: usuario,
                    Contraseña: contrasena
                }
            }).catch(function(err) {
                var respuesta = {
                  success: false,
                  data:false,
                  err: err
                };
                resolve(respuesta);
              });;
            usuas.then(resolveresult1 => {
                //   var Selection = JSON.parse(resolveresult1.Usuarios);
                //console.log(Selection[0]);
                console.log(resolveresult1);
                if (resolveresult1) {
                    const sedes = sedesusuarios.findAll({
                        where: {
                            IdUsuario:resolveresult1.IdUsuario
                        }
                    }).then(sed => {
                        var respuesta = {
                            success: true,
                            token: jwt.createToken(resolveresult1,sed),
                        }
                        resolve(respuesta);
                    }).catch(function(err) {
                        var respuesta = {
                          success: false,
                          data:false,
                          err: err
                        };
                        resolve(respuesta);
                      });;
                } else {
                    resolve({ success: false, message: 'NO VALID USERNAME or password' });
                }
            });

        });
        return p;
    },
};
