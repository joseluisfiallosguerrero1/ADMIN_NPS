var express = require('express');
var cors = require('cors');
var app = express();
const jwt = require('./helpers/jwt');
var md_auth = require('./middlewares/authenticated');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization');
  next();
});
//Controllers
var comentarios = require('./Controllers/Comentario').comentario;
var usuarios = require('./Controllers/user').usuario;


//Comentarios

app.use(function (req, res, next) {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

app.post('/api/v1/login/login', function (req, res) {
  console.log("aasss");
  usuarios.login(req.body.user, req.body.password).then(function (_message) {
    res.send(_message);
  });
});
app.post('/npsClassification/comentarios', function (req, res) {
  console.log("aasss");
  comentarios.create().then(function (_message) {
    res.send(_message);
  });
});
app.post('/npsClassification/usuarios', function (req, res) {
  console.log("aa");
 
  comentarios.LLenadoDeUsuarios(req.body.name,req.body.idencuesta).then(function (_message) {
    res.send(_message);
  });
});
app.post('/npsClassification/aspectosTemas', function (req, res) {
  console.log("aa");
  console.log(req.body.name);
  console.log(req.body.idencuesta);
  comentarios.LLenadoDeAspectosTemas(req.body.name,req.body.idencuesta).then(function (_message) {
    res.send(_message);
  });
});
app.post('/npsClassification/temas', function (req, res) {
  console.log("aa");
  comentarios.DistribucionAspectosTemas(req.body.idencuesta).then(function (_message) {
    res.send(_message);
  });
});
app.post('/npsClassification/temasDistribucion', function (req, res) {
  console.log("aa");
  comentarios.DistribuciondeTemas(req.body.idencuesta).then(function (_message) {
    res.send(_message);
  });
});
app.post('/npsClassification/cola', function (req, res) {
  console.log("aa");
  comentarios.crearCola(req.body.idencuesta,req.body.name,req.body.seleccion).then(function (_message) {
    res.send(_message);
  });
});
app.get('/npsClassification/aspectos/:encuesta_id', function (req, res) {
  console.log('suitsuitsuitadfadsfa');
  comentarios.aspectosPorEncuesta(req.params.encuesta_id).then(function (_message) {
    res.send(_message);
  });
});
app.get('/npsClassification/temas/:aspect_id', function (req, res) {
  console.log('suitsuitsuitadfadsfa');
  comentarios.temasPorAspectoa(req.params.aspect_id).then(function (_message) {
    res.send(_message);
  });
});
app.get('/npsClassification/instituciones', function (req, res) {
  console.log('suitsuitsuitadfadsfa');
  comentarios.Instituciones().then(function (_message) {
    res.send(_message);
  });
});
app.get('/npsClassification/Coordinadores/:idencuesta', function (req, res) {
  console.log('suitsuitsuitadfadsfa');
  console.log(req.params);
  comentarios.CoordinadoresPorEncuesta(req.params.idencuesta).then(function (_message) {
    res.send(_message);
  });
});



app.post('/npsClassification/distribucion', function (req, res) {
  console.log("aa");
  comentarios.Distribucion().then(function (_message) {
    res.send(_message);
  });
});
app.put('/npsClassification/comentarios/:idComentario', function (req, res) {
  console.log(req.body);
  comentarios.Clasificar(req.params.idComentario, req.body).then(function (_response) {
    res.send(_response);
  });
});
app.put('/npsClassification/pasoDeComentarios', function (req, res) {
  console.log(req.body);
  comentarios.PasoDeComentarios(req.body.idencuesta,req.body.idCoordinador1,req.body.total,req.body.idCoordinador2).then(function (_response) {
    res.send(_response);
  });
});

app.post('/npsClassification/comentariosaClasificar', function (req, res) {
  console.log(req.body);
  comentarios.MostrarComentarios(req.body.idHerramienta, req.body.seleccion, req.body.iduser).then(function (_response) {
    res.send(_response);
  });
});
app.post('/npsClassification/csva', function (req, res) {
  console.log(req.body.file);
  console.log(req.body.name);
  comentarios.uploadToBlob2(req.body.file, req.body.name).then(function (_message) {
    res.send(_message);
  });
});
app.post('/npsClassification/herramientas', function (req, res) {
  comentarios.herramientasActivas().then(function (_message) {
    res.send(_message);
  });
});
app.post('/npsClassification/nuevoAspecto', function (req, res) {
  comentarios.agregarAspecto(req.body.idEncuesta,req.body.aspecto).then(function (_message) {
    res.send(_message);
  });
});
app.post('/npsClassification/nuevoCoordinador', function (req, res) {
  console.log(req.body.coordinador);
  comentarios.AgregarCoordinador(req.body.coordinador,req.body.cargo,req.body.campus,req.body.idencuesta).then(function (_message) {
    res.send(_message);
  });
});
app.post('/npsClassification/nuevoTema', function (req, res) {
  comentarios.AgregarTema(req.body.idAspecto,req.body.tema).then(function (_message) {
    res.send(_message);
  });
});
app.post('/npsClassification/herramientaPorNombre', function (req, res) {
  comentarios.herramientaPorNombre(req.body.Nombre).then(function (_message) {
    res.send(_message);
  });
});
app.post('/npsClassification/archivoNuevo', function (req, res) {
  comentarios.createArchivo(req.body.nombre, req.body.idherramienta).then(function (_message) {
    res.send(_message);
  });
});
app.post('/npsClassification/herramientaNueva', function (req, res) {
  console.log('estoy dentro');
  comentarios.createHerramienta(req.body.Nombre, req.body.IdInstitucion, req.body.Descripcion).then(function (_message) {
    res.send(_message);
  });
});

app.put('/npsClassification/herramientas', function (req, res) {
  console.log(req.body);
  comentarios.ModificarHerramienta(req.body.IdHerramienta, req.body.Herramienta).then(function (_response) {
    res.send(_response);
  });
});
app.put('/npsClassification/archivos', function (req, res) {
  console.log(req.body);
  comentarios.ModificarArchivo(req.body.idarchivo, req.body.Archivo).then(function (_response) {
    res.send(_response);
  });
});
app.post('/npsClassification/archivosPorHerramienta', function (req, res) {
  console.log('suitsuitsuit');
  comentarios.MostrarArchivosPorHerramienta(req.body.Nombre).then(function (_message) {
    res.send(_message);
  });
});
app.get('/api/v1/classified_answers/:survey_id/:page', md_auth.ensureAuth, function (req, res) {
  let token = req.get('authorization');
  let user = jwt.returnUser(token);
  console.log('suitsuitsuitadfadsfa');
  comentarios.ComentariosClasificados(req.params.survey_id, req.params.page, user.id).then(function (_message) {
    res.send(_message);
  });
});
app.get('/api/v1/surveys/:campus_id/:page', md_auth.ensureAuth, function (req, res) {
  console.log('suitsuitsuitadfadsfa');
  comentarios.herramientasPorSede(req.params.campus_id, req.params.page).then(function (_message) {
    res.send(_message);
  });
});
app.get('/api/v1/unclassified_answers/:survey_id/:page', md_auth.ensureAuth, function (req, res) {
  let token = req.get('authorization');
  let user = jwt.returnUser(token);
  console.log('suitsuitsuitadfadsfa');
  comentarios.ComentariosPorClasificar(req.params.survey_id, req.params.page, user.id).then(function (_message) {
    res.send(_message);
  });
});
app.get('/api/v1/answer/:answer_id', md_auth.ensureAuth, function (req, res) {
  console.log('suitsuitsuitadfadsfa');
  comentarios.UnComentario(req.params.answer_id).then(function (_message) {
    res.send(_message);
  });
});
app.put('/api/v1/answer/:answer_id', md_auth.ensureAuth, function (req, res) {
  console.log('suitsuitsuitadfadsfa');
  comentarios.modificarComentario(req.params.answer_id, req.body).then(function (_message) {
    res.send(_message);
  });
});
app.get('/api/v1/answer_classifications/:answer_id', md_auth.ensureAuth, function (req, res) {
  console.log('suitsuitsuitadfadsfa');
  comentarios.Clasificaciones(req.params.answer_id).then(function (_message) {
    res.send(_message);
  });
});
app.post('/api/v1/answer_classification/:answer_id', md_auth.ensureAuth, function (req, res) {
  console.log('suitsuitsuitadfadsfa');
  comentarios.nuevaClasificacion(req.params.answer_id, req.body.aspect_id, req.body.topic_id, req.body.kind_id).then(function (_message) {
    res.send(_message);
  });
});
app.delete('/api/v1/answer_classification', md_auth.ensureAuth, function (req, res) {
  console.log("borrado")
  console.log('suitsuitsuitadfadsfa');
  comentarios.borrarClasificacion(req.body.id).then(function (_message) {
    res.send(_message);
  });
});
app.get('/api/v1/classifications/:survery_id',md_auth.ensureAuth, function (req, res) {
  console.log('suitsuitsuitadfadsfa');
  comentarios.clasificacionesPorHerramienta(req.params.survery_id).then(function (_message) {
    res.send(_message);
  });
});
app.get('/api/v1/aspects/:aspect_id',md_auth.ensureAuth, function (req, res) {
  console.log('suitsuitsuitadfadsfa');
  comentarios.temasPorAspecto(req.params.aspect_id).then(function (_message) {
    res.send(_message);
  });
});
/*z
app.post('/uploadData/template2', function(req, res) {
 
  templates.create2(req.body.Name, req.body.Column,req.body.Location).then(function(_message) {
    res.send(_message);
  });
});
*/

var server = app.listen(process.env.PORT || 8080, function () {
  console.log(server.address());
});

module.exports = app;