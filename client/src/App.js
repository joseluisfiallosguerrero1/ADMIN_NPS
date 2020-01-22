import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Sibebar } from './Components/sibebar';
import { Herramienta } from './Components/herramientas';
import { MenuDeHerramientas } from './Components/menuDeHerramientas';
import { MenuAspectos } from './Components/menuAspectos';

import { CoordinadoresLista } from './Components/coordinadoresLista';

window.React = React;

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <Sibebar /> */}
          <Switch>
            <Route path="/Herramientas" component={Herramienta} />
            <Route path="/menuDeHerramientas" component={MenuDeHerramientas} />
            <Route path="/menuDeAspectos" component={MenuAspectos} />
            <Route path="/menuDeCoordinadores" component={CoordinadoresLista} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}



