
import 'whatwg-fetch';



let url = 'http://localhost:8080';


const createCsv = csv =>
  fetch(url + '/npsClassification/csv', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(csv)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });

const createCsva = csv =>
  fetch(url + '/npsClassification/csva', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(csv)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });

const aspectosPorEncuesta = aspecto =>
  fetch(url + '/npsClassification' + '/aspectos/' + aspecto, {
    method: 'GET',
    headers: {
      'Access-Control-Allow_origin': '*',
    },
    mode: 'cors'
  })
    .then(response => response.json())
    .then(jsondata => {
      return jsondata;
    });
const getInstituciones= () =>
  fetch(url + '/npsClassification/instituciones', {
    method: 'GET',
    headers: {
      'Access-Control-Allow_origin': '*',
    },
    mode: 'cors'
  })
    .then(response => response.json())
    .then(jsondata => {
      return jsondata;
    });
const coordinadoresPorEncuesta = idencuesta =>
  fetch(url + '/npsClassification' + '/Coordinadores/' + idencuesta, {
    method: 'GET',
    headers: {
      'Access-Control-Allow_origin': '*',
    },
    mode: 'cors'
  })
    .then(response => response.json())
    .then(jsondata => {
      return jsondata;
    });
const temasPorAspecto = aspect_id =>
  fetch(url + '/npsClassification' + '/temas/' + aspect_id, {
    method: 'GET',
    headers: {
      'Access-Control-Allow_origin': '*',
    },
    mode: 'cors'
  })
    .then(response => response.json())
    .then(jsondata => {
      return jsondata;
    });

const herramientas = () =>
  fetch(url + '/npsClassification/herramientas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',

  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });

const moverComentario = (data) =>
  fetch(url + '/npsClassification/pasoDeComentarios', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });
const herramienta = id =>
  fetch(url + '/npsClassification/herramientaPorNombre', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(id)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });
const agregarTema = tema =>
  fetch(url + '/npsClassification/nuevoTema', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(tema)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });
const agregarCoordinador = coordina =>
  fetch(url + '/npsClassification/nuevoCoordinador', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(coordina)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });
const agregarAspecto = aspec =>
  fetch(url + '/npsClassification/nuevoAspecto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(aspec)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });
const crearCola = bod =>
  fetch(url + '/npsClassification/cola', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(bod)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });
const archivosPorHerramientas = id =>
  fetch(url + '/npsClassification/archivosPorHerramienta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(id)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });
const LlenadoDeAspectoTema = (bod) =>
  fetch(url + '/npsClassification/aspectosTemas', {
    method: 'POST',
    headers: {
      'Access-Control-Allow_origin': 'http://localhost:8080',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(bod)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });
const LLenadoDeUsuarios = (bod) =>
  fetch(url + '/npsClassification/usuarios', {
    method: 'POST',
    headers: {
      'Access-Control-Allow_origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(bod)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });
const DistribucionAspectosTemas = (bod) =>
  fetch(url + '/npsClassification/temas', {
    method: 'POST',
    headers: {
      'Access-Control-Allow_origin': 'http://localhost:8080',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(bod)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });
const DistribuciondeTemas = (bod) =>
  fetch(url + '/npsClassification/temasDistribucion', {
    method: 'POST',
    headers: {
      'Access-Control-Allow_origin': 'http://localhost:8080',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(bod)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });

const nuevaHerramienta = (bod) =>
  fetch(url + '/npsClassification/herramientaNueva', {
    method: 'POST',
    headers: {
      'Access-Control-Allow_origin': 'http://localhost:8080',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(bod)
  })
    .then(response => response.json())

    .then(jsondata => {
      return jsondata;
    });

export default {
  createCsv,
  herramientas,
  archivosPorHerramientas,
  herramienta,
  aspectosPorEncuesta,
  LlenadoDeAspectoTema,
  DistribucionAspectosTemas,
  DistribuciondeTemas,
  temasPorAspecto,
  LLenadoDeUsuarios,
  coordinadoresPorEncuesta,
  crearCola,
  createCsva,
  agregarAspecto,
  agregarCoordinador,
  agregarTema,
  moverComentario,
  nuevaHerramienta,
  getInstituciones
};