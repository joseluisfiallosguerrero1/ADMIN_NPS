import React from 'react';
import { NavLink } from 'react-router-dom';
import './materialize/css/materialize.css';


export class Sibebar extends React.Component {
  render() {
    return (
      <ul id="slide-out" className="sidenav sidenav-fixed">
        <li>
          <NavLink to="/Herramientas"> Herramientas</NavLink>
        </li>
        <li>
          <NavLink to="/groups">Temas y Aspectos</NavLink>
        </li>
        <li>
          <NavLink to="/users"> Usuarios</NavLink>
        </li>
        <li>
          <NavLink to="/reports"> Reporteria</NavLink>
        </li>
        <li>
          <NavLink to="/advisors"> Notificaciones</NavLink>
        </li>

        <li>
          <NavLink to="/">Conocenos</NavLink>
        </li>
      </ul>
    );
  }
}
