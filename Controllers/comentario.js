//var db = require('./../connection/configdb');
var excel = require('excel4node');
var azure = require('azure-storage');
var md5 = require('md5');
//var blobService = azure.createBlobService();
var xlsxj = require("xlsx-to-json");
var excels = require('excel-stream')
var fs = require('fs')
var randomstring = require("randomstring");
//const csv = require('csv-parser');
var csv = require('csv-stream');
var request = require('request');
var stream = require('stream');
const models = require('../Models');
//import db from '../Models';
const readXlsxFile = require('read-excel-file/node');
var fileService = azure.createBlobService(
    'filestoragenps',
    'DBxlDla/wzEFe3PoEPZeo4lztl5muNNQXoDQ8wYftoy6ReBjUMlclqxacMvPXEa+Q5/L1DeMeYeV8Ii8kYW35Q=='
);
var comentarios = models.Comentarios
var usuarios = models.Usuarios
var instituciones = models.Instituciones
var comentariosUsuarios = models.ComentariosUsuarios
var ComentarioPorHerramienta = models.ComentarioPorHerramienta
var herramientas = models.Encuestas
var archivos = models.Archivos
var sedes = models.Sedes
var aspectostemasClasificaciones = models.AspectosTemasClasificaciones
var aspectos = models.Aspectos
var temas = models.Temas
var clasificaciones = models.Clasificaciones
var coordinadores = models.Coordinadores
var coordinadoresns = models.Coordinadoresns
var aspectostemas = models.AspectoTemas
var cola = models.Cola_De_Procesos

var Sequelize = require('sequelize');

exports.comentario = {
    create: function () {
        var p = new Promise(function (resolve, reject) {
            var control = false;
            var datetime = new Date();
            fileService.getBlobToStream('npstest', 'Book1.xlsx', fs.createWriteStream('Book1.xlsx'), function (error, serverBlob) {
                if (!error) {
                    // Blob available in serverBlob.blob variable
                    console.log("ffffffffffff");
                    console.log(serverBlob);
                    console.log("pedro");

                    xlsxj({
                        input: "Book1.xlsx",
                        output: null,
                        //sheet:"NPS UPN 2018"
                    }, function (err, result) {
                        if (err) {
                            resolve(err);
                            console.error(err);
                        } else {
                            var highest = result[Object.keys(result).sort().pop()]
                            console.log("pedro2");
                            result.forEach(element => {
                                console.log("aaaaaasssss");
                                console.log(element);
                                const comen = comentarios.create({
                                    PreClasificacion: element.Polaridad,
                                    Clasificacion: '',
                                    Status: element.Status,
                                    Comentario: element.Comentario,
                                    NombreDeArchivo: 'book1',
                                    Fecha: datetime,
                                    Estado: 0,
                                    Aspecto: element.Aspecto,
                                    IdHerramienta: 1,
                                    IdUsuario: 1,
                                    Tema: element.Tema,
                                    Status: 0
                                }).then(res => {
                                    if (element == highest) {
                                        var respuesta = {
                                            success: 'true',

                                        };
                                        resolve(respuesta);
                                    }
                                });
                                //
                            });

                        }
                    });


                } else {
                    console.log("aaaaaaaaaaaaaaaaaaa" + error);
                    resolve(error);
                }
            });

            /*
            readXlsxFile(fs.createReadStream('Book1.xlsx')).then((rows) => {
              console.log("pedro2");
              rows.forEach(element => {
                  console.log("aaaaaasssss");
                  console.log(element);
              });
          })
          */

        });
        return p;
    },
    createArchivo: function (nombre, idherramienta) {
        var p = new Promise(function (resolve, reject) {
            var datetime = new Date();
            const archi = archivos
                .create({
                    Nombre: nombre,
                    IdHerramienta: idherramienta,
                    Estado: 1,
                    Fecha: datetime
                })
                .catch(function (err) {
                    var respuesta = {
                        success: 'false',
                        Msg: 'The input data is incorrect'
                    };
                    resolve(respuesta);
                });
            archi.then(res => {
                var respuesta = {
                    success: true,
                    archivo: res
                };
                resolve(respuesta);
            })

        });
        return p;
    },
    createHerramienta: function (nombre, idinstitucion, descripcion) {
        var p = new Promise(function (resolve, reject) {
            var datetime = new Date();
            const herra = herramientas
                .create({
                    Nombre: nombre,
                    IdInstitucion: idinstitucion,
                    Estado: 0,
                    Descripcion: descripcion
                })
                .catch(function (err) {
                    var respuesta = {
                        success: 'false',
                        Msg: err
                    };
                    resolve(respuesta);
                });
            herra.then(res => {
                var respuesta = {
                    success: true,
                    herramienta: res
                };
                resolve(respuesta);
            })

        });
        return p;
    },
    uploadToBlob: function (csv, name) {
        var p = new Promise(function (resolve, reject) {
            console.log("entro");
            console.log("hey +  " + csv);
            console.log("hey +  " + name);
            const ot = Buffer.from(csv, 'base64');

            var s = new stream.Readable();

            s.push(ot);
            s.push(null);

            fileService.createBlockBlobFromStream(
                'source',
                name,
                s,
                ot.length,
                error => {
                    if (!error) {
                        // file uploaded
                        var respuesta = {
                            success: true,
                            Msg: 'file uploaded'
                        };
                        resolve(respuesta);
                    } else {
                        var respuesta = {
                            success: false,
                            Msg: 'Error in input data',
                            err: error
                        };
                        resolve(respuesta);
                    }
                }
            );
        });
        return p;
    },
    uploadToBlob2: function (csv, name) {
        var p = new Promise(function (resolve, reject) {
            console.log("entro");
            console.log("hey +  " + csv);
            console.log("hey +  " + name);
            const ot = Buffer.from(csv, 'base64');

            var s = new stream.Readable();

            s.push(ot);
            s.push(null);

            fileService.createBlockBlobFromStream(
                'admin-files',
                name,
                s,
                ot.length,
                error => {
                    if (!error) {
                        // file uploaded
                        var respuesta = {
                            success: true,
                            Msg: 'file uploaded'
                        };
                        resolve(respuesta);
                    } else {
                        var respuesta = {
                            success: false,
                            Msg: 'Error in input data',
                            err: error
                        };
                        resolve(respuesta);
                    }
                }
            );
        });
        return p;
    },
    LLenadoDeUsuarios: function (name, idencuesta) {
        var p = new Promise(function (resolve, reject) {

            var datetime = new Date();
            console.log(name);
            fileService.getBlobToStream('source', name, fs.createWriteStream(name), function (error, serverBlob) {
                /*
                if (!error) {
                    fs.createReadStream(name)
                        .on('error', () => {
                            console.log("aa")
                        })
                        
                        .pipe(csv())
                        .on('data', (row) => {
                            console.log(row);
                        })

                        .on('end', () => {
                            console.log("b");
                        })

                } else {
                    console.log("aaaaaaaaaaaaaaaaaaa" + error);
                }
                */
                serverBlob
                var options = {
                    delimiter: ';', // default is ,
                    endLine: '\n', // default is \n,
                    columns: ['Coordinador', 'Cargo', 'Campus', 'Modalidad'], // by default read the first line and use values found as columns
                    columnOffset: 1, // default is 0
                    escapeChar: '"', // default is an empty string
                    enclosedChar: '"' // default is an empty string
                }

                var csvStream = csv.createStream(options);
                fs.createReadStream(name).pipe(csvStream)
                    .on('error', function (err) {
                        console.error(err);
                    })
                    //.on('header', function(columns) {
                    //   console.log(columns);
                    // })
                    .on('data', function (data) {
                        // outputs an object containing a set of key/value pair representing a line found in the csv file.


                        console.log("aaaaaasssss");

                        const coordi = coordinadores.create({
                            COORDINADOR: data.Coordinador,
                            CARGO: data.Cargo,
                            CAMPUS: data.Campus,
                            MODALIDAD: data.Modalidad,
                            NOMBRE_DE_ARCHIVO_ORIGEN: 'Usuarios',
                            USUARIO_QUE_CARGA: 'usuario1',
                            PROCESADO: 0,
                            AUX1: 0,
                            IdEncuesta: idencuesta
                        }).then(resi => {
                            var str = data.Coordinador;
                            var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
                            var acronym = matches.join(''); // JSON
                            var contra = randomstring.generate({
                                length: 10,
                                charset: 'alphabetic'
                            });
                            console.log(contra);
                            console.log(acronym);
                            var acronymmd = md5(acronym);
                            var contramd = md5(contra);
                            const coordi = coordinadoresns.create({
                                Rol: data.Cargo,
                                Contraseña: contra,
                                Usuario: acronym,
                                Nombre: data.Coordinador,
                                KeyNumber: 1,
                                Campus: data.Campus,
                                Distribuido: 1,
                                usuariomd: acronymmd,
                                passmd: contramd,
                                IdEncuesta: idencuesta
                            })
                        });

                    })
                    // .on('column',function(key,value){
                    // outputs the column name associated with the value found
                    //   console.log('#' + key + ' = ' + value);
                    // })
                    .on('end', () => {
                        /*
                        console.log("hello");
                        const coor = coordinadores.findAll({
                            where: {
                                IdEncuesta: idencuesta,
                            },
                            attributes:['COORDINADOR','CARGO','CAMPUS', 'IdEncuesta']
                            
                        }).then(result => {
                            console.log("hello");
                            var contador=0;
                            result.forEach(element => {
                                var str = element.COORDINADOR;
                                var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
                                var acronym = matches.join(''); // JSON
                                var contra=randomstring.generate({
                                    length: 10,
                                    charset: 'alphabetic'
                                  });
                                  console.log(contra);
                                  console.log(acronym);
                                 var  acronymmd=md5(acronym);
                                 var contramd=md5(contra);
                                const coordi = coordinadoresns.create({
                                    Rol: element.CARGO,
                                    Contraseña:contra,
                                    Usuario: acronym,
                                    Nombre: element.COORDINADOR,
                                    KeyNumber:1,
                                    Campus:element.CAMPUS,
                                    Distribuido:0,
                                    usuariomd:acronymmd,
                                    passmd:contramd,
                                    IdEncuesta:element.IdEncuesta
                                })
                                console.log(contador);
                                console.log(result.length);
                                if(contador==result.length){
                                    
                                }else{
                                    contador++;
                                }
                            });
                           
                        });
                    */
                        var respuesta = {
                            success: true,
                            data: 'completo'
                        }
                        resolve(respuesta);
                    })

            });


            /*
            readXlsxFile(fs.createReadStream('Book1.xlsx')).then((rows) => {
              console.log("pedro2");
              rows.forEach(element => {
                  console.log("aaaaaasssss");
                  console.log(element);
              });
          })
          */

        });
        return p;
    },
    LLenadoDeAspectosTemas: function (name, idencuesta) {
        var p = new Promise(function (resolve, reject) {

            var datetime = new Date();
            console.log(name);
            fileService.getBlobToStream('source', name, fs.createWriteStream(name), function (error, serverBlob) {

                var options = {
                    delimiter: ';', // default is ,
                    endLine: '\n', // default is \n,
                    columns: ['Aspecto', 'Tema', 'Definicion'], // by default read the first line and use values found as columns
                    columnOffset: 1, // default is 0
                    escapeChar: '"', // default is an empty string
                    enclosedChar: '"' // default is an empty string
                }

                var csvStream = csv.createStream(options);
                fs.createReadStream(name).pipe(csvStream)
                    .on('error', function (err) {
                        console.error(err);
                    })
                    //.on('header', function(columns) {
                    //   console.log(columns);
                    // })
                    .on('data', function (data) {
                        // outputs an object containing a set of key/value pair representing a line found in the csv file.


                        console.log("aaaaaasssss");

                        const aspectotemas = aspectostemas.create({
                            Aspecto: data.Aspecto,
                            Tema: data.Tema,
                            Definicion: data.Definicion,
                            NOMBRE_DE_ARCHIVO_ORIGEN: 'Usuarios',
                            USUARIO_QUE_CARGA: 'usuario1',
                            PROCESADO: 0,
                            AUX1: 0,
                            IdEncuesta: idencuesta
                        }).then(resi => {

                        });

                    })
                    // .on('column',function(key,value){
                    // outputs the column name associated with the value found
                    //   console.log('#' + key + ' = ' + value);
                    // })
                    .on('end', () => {

                        var respuesta = {
                            success: true,
                            data: 'completo'
                        }
                        resolve(respuesta);
                    })

            });


            /*
            readXlsxFile(fs.createReadStream('Book1.xlsx')).then((rows) => {
              console.log("pedro2");
              rows.forEach(element => {
                  console.log("aaaaaasssss");
                  console.log(element);
              });
          })
          */

        });
        return p;
    },
    agregarAspecto: function (idEncuesta, aspecto) {
        var p = new Promise(function (resolve, reject) {
            const aspec = aspectos.create({
                IdEncuesta: idEncuesta,
                Aspecto: aspecto
            }).then(aspectoCreado => {
                var respuesta = {
                    success: true,
                    aspecto: aspectoCreado
                }
                resolve(respuesta);
            })
        });
        return p;
    },
    DistribucionAspectosTemas: function (idencuesta) {
        var p = new Promise(function (resolve, reject) {
            console.log(idencuesta);
            models.sequelize.query('SELECT  DISTINCT top 100 Aspecto FROM source.AspectoTemas ', {
                model: aspectostemas,
                mapToModel: true
            }).then((results) => {

                console.log(results);
                var i;

                for (i = 0; i < results.length; i++) {
                    console.log(results[i].dataValues.Aspecto)
                    var A = aspectos.create({
                        Aspecto: results[i].dataValues.Aspecto,
                        IdEncuesta: idencuesta
                    }).then(v => {
                        console.log(i);
                        if (i == results.length) {
                            var subida = {
                                succes: true,
                                data: "complete"
                            }
                            resolve(subida);
                        }
                    });


                }
            })
        });
        return p;
    },
    Instituciones: function () {
        var p = new Promise(function (resolve, reject) {
            //console.log(idencuesta);
            models.sequelize.query('select distinct Nombre,IdInstitucion  from nps.Instituciones', {
                model: instituciones,
                // mapToModel: true
            }).then((results) => {

                console.log(results);

                var subida = {
                    succes: true,
                    data: results
                }
                resolve(subida);

            });
        });
        return p;
    },
    PasoDeComentarios: function (idencuesta, idCoordinador1, total, idCoordinador2) {
        var p = new Promise(function (resolve, reject) {
            try {
                total = total * 1;
                models.sequelize.query('UPDATE TOP (:total)  nps.Respuestas set IdCoordinador=:idCoordinador2 where IdCoordinador=:idCoordinador1 and Estado=0 and IdEncuesta=:idencuesta ', {
                    replacements: { total: total, idCoordinador1: idCoordinador1, idCoordinador2: idCoordinador2, idencuesta: idencuesta },
                    model: coordinadoresns,
                    mapToModel: true,
                    //  type: QueryTypes.SELECT
                }).then((results) => {
                    var subida = {
                        success: true,
                        data: results
                    }
                    resolve(subida);
                });
            } catch (e) {
                console.log(e);
            }
        });
        return p;

    },


    AgregarTema: function (idAspecto, tema) {
        var p = new Promise(function (resolve, reject) {
            const t = temas.create({
                Tema: tema,
                IdAspecto: idAspecto
            }).then(crear => {
                var respuesta = {
                    success: true,
                    data: crear
                }
                resolve(respuesta);
            })

        });
        return p;
    },
    AgregarCoordinador: function (coordinador, cargo, campus, idencuesta) {
        var p = new Promise(function (resolve, reject) {


            var str = coordinador;
            var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
            var acronym = matches.join(''); // JSON
            var contra = randomstring.generate({
                length: 10,
                charset: 'alphabetic'
            });
            console.log(contra);
            console.log(acronym);
            var acronymmd = md5(acronym);
            var contramd = md5(contra);
            const coordi = coordinadoresns.create({
                Rol: cargo,
                Contraseña: contra,
                Usuario: acronym,
                Nombre: coordinador,
                KeyNumber: 1,
                Campus: campus,
                Distribuido: 1,
                usuariomd: acronymmd,
                passmd: contramd,
                IdEncuesta: idencuesta
            }).then(creado => {
                var respuesta = {
                    success: true,
                    coodinador: creado
                }
                resolve(respuesta);
            })
        });
        return p;
    },
    DistribuciondeTemas: function (idencuesta) {
        var p = new Promise(function (resolve, reject) {

            console.log("siempre");
            var aspec = aspectos.findAll({
                where: {
                    IdEncuesta: idencuesta
                }
            }).then(aspecs => {
                var aspectosT = aspectostemas.findAll({
                    where: {
                        IdEncuesta: idencuesta
                    },
                    attributes: ['Aspecto', 'Tema']
                }).then(respuesta => {
                    console.log(respuesta.length)
                    var y = 0;
                    for (y = 0; y < respuesta.length; y++) {
                        var aspec = "";
                        var id = 0;
                        var z = 0;
                        var contador = 0
                        var aspectoEncontrado = "";
                        var TemaEncontrado = "";
                        for (z = 0; z < aspecs.length; z++) {
                            if (respuesta[y].dataValues.Aspecto == aspecs[z].dataValues.Aspecto) {
                                console.log(respuesta[y].dataValues.Aspecto + "                " + aspecs[z].dataValues.Aspecto)
                                contador++;
                                console.log(contador)
                                aspectoEncontrado = aspecs[z].dataValues.IdAspecto;
                                TemaEncontrado = respuesta[y].dataValues.Tema
                                console.log(aspectoEncontrado + "aaaaaaaaaaaaa")
                                console.log(TemaEncontrado + "aaaaaaaaaaaaa")
                            }
                        }
                        console.log(z);
                        var aspecT = temas.create({
                            IdAspecto: aspectoEncontrado,
                            Tema: TemaEncontrado,
                            IdEncuesta: idencuesta
                        }).then(final => {
                            if (y == respuesta.length) {
                                var subida = {
                                    succes: true,
                                    data: "complete"
                                }
                                resolve(subida);
                            }
                        })

                    }


                });
            })


        });
        return p;
    },
    aspectosPorEncuesta: function (idEncuesta) {
        var p = new Promise(function (resolve, reject) {
            const as = aspectos.findAll({
                where: {
                    IdEncuesta: idEncuesta
                }
            });
            as.then(resolveresult1 => {
                //   var Selection = JSON.parse(resolveresult1.Usuarios);
                //console.log(Selection[0]);
                var respuesta = {
                    success: true,
                    aspectos: resolveresult1
                };
                resolve(respuesta);
            });

        });
        return p;
    },

    crearCola: function (idEncuesta, name,seleccion) {
        var p = new Promise(function (resolve, reject) {
            const colas = cola.create({
                IdEncuesta: idEncuesta,
                Nombre_De_Archivo: name,
                Distribucion: seleccion
            }).then(creado => {
                var respuesta = {
                    success: true,
                    cola: creado
                }
                resolve(respuesta);
            })
        });
        return p;
    },
    temasPorAspectoa: function (idAspecto) {
        var p = new Promise(function (resolve, reject) {
            const tem = temas.findAll({
                where: {
                    IdAspecto: idAspecto
                }
            });
            tem.then(resolveresult1 => {
                //   var Selection = JSON.parse(resolveresult1.Usuarios);
                console.log(resolveresult1);
                var respuesta = {
                    success: true,
                    temas: resolveresult1
                };
                resolve(respuesta);
            });

        });
        return p;
    },
    CoordinadoresPorEncuesta: function (idEncuesta) {
        var p = new Promise(function (resolve, reject) {
            const co = coordinadoresns.findAll({
                where: {
                    IdEncuesta: idEncuesta,
                    Distribuido: 1
                }

            }).then(resp => {
                var respuesta = {
                    success: true,
                    coordinadores: resp
                }
                resolve(respuesta);
            });
        });
        return p;
    },

    Distribucion: function () {
        var p = new Promise(function (resolve, reject) {
            const users = usuarios.findAll({

            });
            users.then(resolveresult1 => {
                //   var Selection = JSON.parse(resolveresult1.Usuarios);
                //console.log(Selection[0]);
                const comentaries = comentarios.findAll({

                });
                comentaries.then(resolveresult2 => {
                    console.log(resolveresult1[0].dataValues.IdUsuario);
                    console.log(resolveresult1.length);
                    console.log(resolveresult2.length)
                    var tam = resolveresult1.length - 1;
                    var cont = 0;

                    resolveresult2.forEach(element => {
                        console.log(element.dataValues.IdComentario);
                        var modify = {
                            IdUsuario: resolveresult1[cont].dataValues.IdUsuario
                        }
                        console.log(modify);
                        const comi = comentarios
                            .update(modify, {
                                where: {
                                    IdComentario: element.dataValues.IdComentario
                                }
                            }).then(res => {
                                if (element == resolveresult2[resolveresult2.length - 1]) {
                                    console.log(element.dataValues.IdComentario);
                                    console.log(resolveresult1[cont].dataValues.IdUsuario);
                                    var respuesta = {
                                        success: 'true',
                                    };
                                    resolve(respuesta);
                                }
                            });;
                        if (cont == tam) {
                            cont = 0;
                        } else {
                            cont = cont + 1;
                        }
                    });

                });
            });

        });


        /*
        readXlsxFile(fs.createReadStream('Book1.xlsx')).then((rows) => {
          console.log("pedro2");
          rows.forEach(element => {
              console.log("aaaaaasssss");
              console.log(element);
          });
      })
      */

        return p;
    },
    Clasificar: function (idComentario, modify) {
        var p = new Promise(function (resolve, reject) {
            console.log(modify);
            const comenta = comentarios
                .update(modify, {
                    where: {
                        IdComentario: idComentario
                    }
                })
                .catch(function (err) {
                    var respuesta = {
                        success: 'false',
                        Msg: 'The input data is incorrect'
                    };
                    resolve(respuesta);
                });
            comenta.then(resolves => {
                var condicion3 = comentarios
                    .findOne({
                        where: {
                            IdComentario: idComentario
                        }
                    })
                    .then(resolveresult3 => {
                        var respuesta = {
                            success: 'true',
                            user: resolveresult3
                        };
                        resolve(respuesta);
                    });
            });

        });

        return p;
    },
    ModificarArchivo: function (idArchivo, modify) {
        var p = new Promise(function (resolve, reject) {
            console.log(modify);
            const archi = archivos
                .update(modify, {
                    where: {
                        IdArchivo: idArchivo
                    }
                })
                .catch(function (err) {
                    var respuesta = {
                        success: false,
                        Msg: 'The input data is incorrect'
                    };
                    resolve(respuesta);
                });
            archi.then(resolves => {
                var condicion3 = archivos
                    .findOne({
                        where: {
                            IdArchivo: idArchivo
                        }
                    })
                    .then(resolveresult3 => {
                        var respuesta = {
                            success: 'true',
                            archivo: resolveresult3
                        };
                        resolve(respuesta);
                    });
            });

        });

        return p;
    },
    ModificarHerramienta: function (idherramienta, modify) {
        var p = new Promise(function (resolve, reject) {
            console.log(modify);
            const herra = herramientas
                .update(modify, {
                    where: {
                        IdHerramienta: idherramienta
                    }
                })
                .catch(function (err) {
                    var respuesta = {
                        success: false,
                        Msg: 'The input data is incorrect'
                    };
                    resolve(respuesta);
                });
            herra.then(resolves => {
                var condicion3 = herramientas
                    .findOne({
                        where: {
                            IdHerramienta: idherramienta
                        }
                    })
                    .then(resolveresult3 => {
                        var respuesta = {
                            success: 'true',
                            herramienta: resolveresult3
                        };
                        resolve(respuesta);
                    });
            });

        });

        return p;
    },
    MostrarComentarios: function (idHerramienta, seleccion, iduser) {
        var p = new Promise(function (resolve, reject) {
            const comentarios = ComentarioPorHerramienta.findAll({
                limit: 11,
                where: {
                    IdHerramienta: idHerramienta,
                    Status: 0,
                    Estado: seleccion,
                    IdUsuario: iduser
                },
                attributes: ['IdComentario', 'PreClasificacion', 'Aspecto', 'tema', 'IdHerramienta', 'Status', 'Estado', 'Comentario'],
                order: [
                    ['IdComentario', 'ASC'],
                ],
            });
            comentarios.then(resolveresult1 => {
                //   var Selection = JSON.parse(resolveresult1.Usuarios);
                //console.log(Selection[0]);
                var respuesta = {
                    success: 'true',
                    cometarios: resolveresult1
                };
                resolve(respuesta);
            });

        });
        return p;
    },
    MostrarArchivosPorHerramienta: function (nombre) {
        var p = new Promise(function (resolve, reject) {
            const archis = archivos.findAll({

                where: {

                    Nombre: nombre,
                    Estado: 1,
                },
                attributes: ['IdHerramienta', 'IdArchivo', 'Fecha', 'Estado', 'Nombre'],
            });
            archis.then(resolveresult1 => {
                //   var Selection = JSON.parse(resolveresult1.Usuarios);
                //console.log(Selection[0]);
                var respuesta = {
                    success: 'true',
                    archivos: resolveresult1
                };
                resolve(respuesta);
            });

        });
        return p;
    },
    herramientasActivas: function () {
        var p = new Promise(function (resolve, reject) {
            const herramienta = herramientas.findAll({
                where: {
                    Estado: 0
                }
            });
            herramienta.then(resolveresult1 => {
                //   var Selection = JSON.parse(resolveresult1.Usuarios);
                //console.log(Selection[0]);
                var respuesta = {
                    success: 'true',
                    encuestas: resolveresult1
                };
                resolve(respuesta);
            });

        });
        return p;
    },
    herramientaPorNombre: function (nombre) {
        var p = new Promise(function (resolve, reject) {
            const herramienta = herramientas.findAll({
                where: {
                    Nombre: nombre
                },

            });
            herramienta.then(resolveresult1 => {
                //   var Selection = JSON.parse(resolveresult1.Usuarios);
                //console.log(Selection[0]);
                var respuesta = {
                    success: 'true',
                    herramienta: resolveresult1
                };
                resolve(respuesta);
            });

        });
        return p;
    },
    herramientaPorNombre: function (nombre) {
        var p = new Promise(function (resolve, reject) {
            const herramienta = herramientas.findAll({
                where: {
                    Nombre: nombre
                },

            }).catch(function (err) {
                var respuesta = {
                    success: false,
                    data: false,
                    err: err
                };
                resolve(respuesta);
            });
            herramienta.then(resolveresult1 => {
                //   var Selection = JSON.parse(resolveresult1.Usuarios);
                //console.log(Selection[0]);
                var respuesta = {
                    success: 'true',
                    herramienta: resolveresult1
                };
                resolve(respuesta);
            }).catch(function (err) {
                var respuesta = {
                    success: false,
                    data: false,
                    err: err
                };
                resolve(respuesta);
            });

        });
        return p;
    },
    allCampus: function () {
        var p = new Promise(function (resolve, reject) {
            try {
                const sed = sedes.findAll({
                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
                sed.then(resolveresult1 => {
                    var respuesta = {
                        success: true,
                        data: resolveresult1,
                        error: false
                    };
                    resolve(respuesta);
                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
            } catch (error) {
                var respuesta = {
                    success: false,
                    data: false,
                    error: error
                };
                resolve(respuesta);
            }

        });
        return p;
    },
    herramientasPorSede: function (idsede, pagina) {
        var p = new Promise(function (resolve, reject) {

            try {
                const hera = herramientas.findAll({
                    where: {
                        IdSede: idsede
                    }
                }).then(fun => {
                    var tot = 0;
                    if (fun.length < 5) {
                        tot = 1
                    } else {
                        if (fun.length % 5 == 0) {
                            tot = fun.length / 5;
                        } else {
                            tot = ((fun.length / 5) - ((fun.length / 5) - Math.trunc(fun.length / 5))) + 1;

                        }

                    }
                    const herra = herramientas.findAll({
                        limit: 5 * 1,
                        offset: pagina * 5,
                        where: {
                            IdSede: idsede
                        }
                    }).catch(function (err) {
                        var respuesta = {
                            success: false,
                            data: false,
                            err: err
                        };
                        resolve(respuesta);
                    });
                    herra.then(resolveresult1 => {
                        if (resolveresult1.length != 0) {
                            var respuesta = {
                                success: true,
                                data: {
                                    herramientas: resolveresult1,
                                    pagina: (pagina * 1) + 1,
                                    pages_total: tot
                                },
                                error: false
                            };
                            resolve(respuesta);
                        } else {
                            var respuesta = {
                                success: false,
                                data: false,
                                error: "No existen encuestas para esta sede"
                            };
                            resolve(respuesta);
                        }

                    }).catch(function (err) {
                        var respuesta = {
                            success: false,
                            data: false,
                            err: err
                        };
                        resolve(respuesta);
                    });
                });
            } catch (error) {
                var respuesta = {
                    success: false,
                    data: false,
                    error: error
                };
                resolve(respuesta);
            }

        });
        return p;
    },
    ComentariosClasificados: function (idherramienta, pagina, idusuario) {
        var p = new Promise(function (resolve, reject) {
            aspectostemasClasificaciones.belongsTo(comentarios, { foreignKey: 'IdComentario' });
            comentarios.hasMany(aspectostemasClasificaciones, { foreignKey: 'IdComentario' });
            console.log('que paso amiguito');


            const aspec0 = comentarios.findAll({
                where: {
                    IdHerramienta: idherramienta,
                    Estado: 1,
                    IdUsuario: idusuario
                },
                attributes: [[Sequelize.fn('COUNT', Sequelize.col('IdComentario')), 'tot']],

            }).then(fun => {
                console.log(fun[0].dataValues.tot)
                var filas = fun[0].dataValues.tot
                var tot = 0;
                if (filas < 10) {
                    tot = 1
                } else {
                    if (filas % 10 == 0) {
                        tot = filas / 10;
                    } else {
                        tot = ((filas / 10) - ((filas / 10) - Math.trunc(filas / 10))) + 1;

                    }

                }
                const aspec = comentarios.findAll({
                    limit: 10 * 1,
                    offset: pagina * 10,
                    where: {
                        IdHerramienta: idherramienta,
                        Estado: 1,
                        IdUsuario: idusuario
                    },
                    attributes: ['IdComentario', 'Comentario', 'FechaModificacion'],
                    order: [[Sequelize.fn('max', Sequelize.col('FechaModificacion')), 'DESC']],
                    group: ['IdComentario', "Comentario", "FechaModificacion"],
                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
                aspec.then(resolveresult1 => {
                    if (resolveresult1.length != 0) {

                        var respuesta = {
                            success: true,
                            data: {
                                comentarios: resolveresult1,
                                pagina: (pagina * 1) + 1,
                                pages_total: tot
                            },
                            error: false
                        };
                        resolve(respuesta);
                    } else {
                        var respuesta = {
                            success: false,
                            data: false,
                            error: "no hay comentarios de herramienta disponible"
                        };
                        resolve(respuesta);
                    }

                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
            });



        });
        return p;
    },
    ComentariosPorClasificar: function (idherramienta, pagina, idusuario) {
        var p = new Promise(function (resolve, reject) {
            try {
                const aspec = comentarios.findAll({
                    where: {
                        IdHerramienta: idherramienta,
                        Estado: 0,
                        IdUsuario: idusuario
                    },
                    attributes: [[Sequelize.fn('COUNT', Sequelize.col('IdComentario')), 'tot']],
                }).then(fun => {
                    console.log(fun[0].dataValues.tot)
                    var filas = fun[0].dataValues.tot
                    var tot = 0;
                    if (filas < 10) {
                        tot = 1
                    } else {
                        if (filas % 10 == 0) {
                            tot = filas / 10;
                        } else {
                            tot = ((filas / 10) - ((filas / 10) - Math.trunc(filas / 10))) + 1;

                        }

                    }
                    const comen = comentarios.findAll({
                        limit: 10 * 1,
                        offset: pagina * 10,
                        where: {
                            IdHerramienta: idherramienta,
                            Estado: 0,
                            IdUsuario: idusuario
                        },
                    }).catch(function (err) {
                        var respuesta = {
                            success: false,
                            data: false,
                            err: err
                        };
                        resolve(respuesta);
                    });
                    comen.then(resolveresult1 => {
                        if (resolveresult1.length != 0) {
                            var respuesta = {
                                success: true,
                                data: {
                                    comentarios: resolveresult1,
                                    pagina: (pagina * 1) + 1,
                                    pages_total: tot
                                },
                                error: false
                            };
                            resolve(respuesta);
                        } else {
                            var respuesta = {
                                success: false,
                                data: false,
                                error: "no hay comentarios de herramienta disponible"
                            };
                            resolve(respuesta);
                        }

                    }).catch(function (err) {
                        var respuesta = {
                            success: false,
                            data: false,
                            err: err
                        };
                        resolve(respuesta);
                    });
                });
            } catch (error) {
                var respuesta = {
                    success: false,
                    data: false,
                    error: error
                };
                resolve(respuesta);
            }

        });
        return p;
    },
    UnComentario: function (idcomentario) {
        var p = new Promise(function (resolve, reject) {
            try {
                const comen = comentarios.findOne({
                    where: {
                        IdComentario: idcomentario
                    },
                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
                comen.then(resolveresult1 => {
                    if (resolveresult1) {
                        var respuesta = {
                            success: true,
                            data: {
                                comentario: resolveresult1,

                            },
                            error: false
                        };
                        resolve(respuesta);
                    } else {
                        var respuesta = {
                            success: false,
                            data: false,
                            error: "Comentario Invalido"
                        };
                        resolve(respuesta);
                    }

                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
            } catch (error) {
                var respuesta = {
                    success: false,
                    data: false,
                    error: error
                };
                resolve(respuesta);
            }

        });
        return p;
    },
    modificarComentario: function (idcomentario, modify) {
        var p = new Promise(function (resolve, reject) {
            try {
                const comen = comentarios.findOne({
                    where: {
                        IdComentario: idcomentario
                    },
                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
                comen.then(resolveresult1 => {
                    if (resolveresult1) {
                        const comenta = comentarios
                            .update(modify, {
                                where: {
                                    IdComentario: idcomentario
                                }
                            })
                            .catch(function (err) {
                                var respuesta = {
                                    success: false,
                                    errror: err,
                                    data: false
                                };
                                resolve(respuesta);
                            });
                        comenta.then(resolves => {
                            var condicion3 = comentarios
                                .findOne({
                                    where: {
                                        IdComentario: idcomentario
                                    }
                                })
                                .then(resolveresult3 => {
                                    var respuesta = {
                                        success: true,
                                        comentario: resolveresult3,
                                        error: false
                                    };
                                    resolve(respuesta);
                                });
                        }).catch(function (err) {
                            var respuesta = {
                                success: false,
                                data: false,
                                err: err
                            };
                            resolve(respuesta);
                        });
                    } else {
                        var respuesta = {
                            success: false,
                            data: false,
                            error: "no existe comentario"
                        };
                        resolve(respuesta);
                    }

                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
            } catch (error) {
                var respuesta = {
                    success: false,
                    data: false,
                    error: error
                };
                resolve(respuesta);
            }


        });

        return p;
    },
    Clasificaciones: function (idcomentario) {
        var p = new Promise(function (resolve, reject) {
            aspectostemasClasificaciones.belongsTo(comentarios, { foreignKey: 'IdComentario' });
            comentarios.hasMany(aspectostemasClasificaciones, { foreignKey: 'IdComentario' });
            console.log('que paso amiguito');
            try {
                const aspec = comentarios.findOne({
                    where: {
                        IdComentario: idcomentario
                    },

                    attributes: ['IdComentario'],
                    include: [
                        {
                            model: aspectostemasClasificaciones,
                            attributes: ['IdAspectoTema', 'IdAspecto', 'IdTema', 'IdClasificacion'],
                        }
                    ]
                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
                aspec.then(resolveresult1 => {
                    if (resolveresult1) {
                        var respuesta = {
                            success: true,
                            data: {
                                comentario: resolveresult1,
                            },
                            error: false
                        };
                        resolve(respuesta);
                    } else {
                        var respuesta = {
                            success: false,
                            data: false,
                            error: "no existe el comentario"
                        };
                        resolve(respuesta);
                    }

                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
            } catch (error) {
                var respuesta = {
                    success: false,
                    data: false,
                    error: error
                };
                resolve(respuesta);
            }

        });
        return p;
    },
    nuevaClasificacion: function (idcomentario, idaspecto, idtema, idclasificacion) {
        var p = new Promise(function (resolve, reject) {
            try {
                const comen = aspectostemasClasificaciones.findOne({
                    where: {
                        IdComentario: idcomentario,
                        IdAspecto: idaspecto,
                        IdTema: idtema,
                        IdClasificacion: idclasificacion
                    }

                }).then(existe => {
                    console.log(existe);
                    if (existe) {
                        var respuesta = {
                            success: false,
                            data: false,
                            err: "No puedes agregar una Clasificación existente."
                        };
                        resolve(respuesta);
                    } else {
                        const comen = aspectostemasClasificaciones.create({
                            IdComentario: idcomentario,
                            IdAspecto: idaspecto,
                            IdTema: idtema,
                            IdClasificacion: idclasificacion
                        }).catch(function (err) {
                            var respuesta = {
                                success: false,
                                data: false,
                                err: err
                            };
                            resolve(respuesta);
                        });
                        comen.then(resolveresult1 => {
                            if (resolveresult1) {
                                var respuesta = {
                                    success: true,
                                    data: {
                                        comentario: resolveresult1,

                                    },
                                    error: false
                                };
                                resolve(respuesta);
                            } else {
                                var respuesta = {
                                    success: false,
                                    data: false,
                                    error: "error"
                                };
                                resolve(respuesta);
                            }

                        }).catch(function (err) {
                            var respuesta = {
                                success: false,
                                data: false,
                                err: err
                            };
                            resolve(respuesta);
                        });
                    }
                })

            } catch (error) {
                var respuesta = {
                    success: false,
                    data: false,
                    error: error
                };
                resolve(respuesta);
            }

        });
        return p;
    },
    borrarClasificacion: function (idaspectotema) {
        var p = new Promise(function (resolve, reject) {
            try {
                const clas = aspectostemasClasificaciones.destroy({
                    where: {
                        IdAspectoTema: idaspectotema
                    }
                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
                clas.then(resolveresult1 => {
                    if (resolveresult1 != 0) {
                        var respuesta = {
                            success: true,
                            error: false
                        };
                        resolve(respuesta);
                    } else {
                        var respuesta = {
                            success: false,
                            data: false,
                            error: "error"
                        };
                        resolve(respuesta);
                    }

                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
            } catch (error) {
                var respuesta = {
                    success: false,
                    data: false,
                    error: error
                };
                resolve(respuesta);
            }

        });
        return p;
    },

    clasificacionesPorHerramienta: function (idherramienta) {
        var p = new Promise(function (resolve, reject) {
            aspectos.belongsTo(herramientas, { foreignKey: 'IdHerramienta' });
            herramientas.hasMany(aspectos, { foreignKey: 'IdHerramienta' });
            temas.belongsTo(herramientas, { foreignKey: 'IdHerramienta' });
            herramientas.hasMany(temas, { foreignKey: 'IdHerramienta' });
            clasificaciones.belongsTo(herramientas, { foreignKey: 'IdHerramienta' });
            herramientas.hasMany(clasificaciones, { foreignKey: 'IdHerramienta' });
            console.log('que paso amiguito');
            try {
                const herra = herramientas.findOne({
                    where: {
                        IdHerramienta: idherramienta,
                        Estado: 1,
                    },
                    include: [
                        {
                            model: aspectos,
                            attributes: ['IdAspecto', 'Aspecto'],
                        },
                        {
                            model: temas,
                            attributes: ['IdTema', 'Tema'],
                        },
                        {
                            model: clasificaciones,
                            attributes: ['IdClasificacion', 'Clasificacion'],
                        }
                    ],

                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
                herra.then(resolveresult1 => {
                    if (resolveresult1) {
                        var respuesta = {
                            success: true,
                            data: resolveresult1,
                            error: false
                        };
                        resolve(respuesta);
                    } else {
                        var respuesta = {
                            success: false,
                            data: false,
                            error: "no hay clasificacion disponible"
                        };
                        resolve(respuesta);
                    }

                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
            } catch (ex) {
                var respuesta = {
                    success: false,
                    data: false,
                    error: ex
                };
                resolve(respuesta);
            }

        });
        return p;
    },
    temasPorAspecto: function (idaspecto) {
        var p = new Promise(function (resolve, reject) {

            console.log('que paso amiguito');
            try {
                const tem = temas.findAll({
                    where: {
                        IdAspecto: idaspecto,

                    },
                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
                tem.then(resolveresult1 => {
                    if (resolveresult1.length != 0) {
                        var respuesta = {
                            success: true,
                            data: resolveresult1,
                            error: false
                        };
                        resolve(respuesta);
                    } else {
                        var respuesta = {
                            success: false,
                            data: false,
                            error: "no hay clasificacion disponible"
                        };
                        resolve(respuesta);
                    }

                }).catch(function (err) {
                    var respuesta = {
                        success: false,
                        data: false,
                        err: err
                    };
                    resolve(respuesta);
                });
            } catch (ex) {
                var respuesta = {
                    success: false,
                    data: false,
                    error: ex
                };
                resolve(respuesta);
            }

        });
        return p;
    },
};
