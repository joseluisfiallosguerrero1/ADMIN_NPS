

import React from 'react';
import advisorServices from '../services/documents.js';
//import '../materialize/css/materialize.css';
//import '../materialize/css/style.css';
import cookie from 'react-cookies'
import { CoordinadoresCard } from './coordinadoresCard.js';
import { CoordinadoresSubir } from './coordinadoresSubir.js';
import { AddCoordinador } from './addCoordinador';
import { MoverCoordinador } from './moverCoordinadores';
import './materialize/css/style.css';
//import { AddUser } from './AddUser';

//import { date } from 'azure-storage';
//import usersService from '../../services/usersService';

export class CoordinadoresLista extends React.Component {
    state = {
        coordinadores: [],
        isMounted: false,
        encues:0
    };
    componentDidMount() {
        this.setState({
            isMounted: true,
            encues:this.props.location.state.IdEncuesta
        });
        this.loadCoordinadores();

        //this.loadGroups();
    }
    componentWillUnmount() {
        this.setState({
            isMounted: false
        });
        console.log("received   "+ cookie.load('idencuesta'));
    }

    loadCoordinadores = () => {
        advisorServices.coordinadoresPorEncuesta(cookie.load('idencuesta')).then(response => {
            console.log(response);
            if (response.success) {
                console.log('yeah');
                this.setState({
                    coordinadores: response.coordinadores
                });
            } else {
            }
        });
    };

    render() {
        let coordi = this.state.coordinadores;
        return (
            <div>
                <div className="col s12 m6">
                    <h4>Coordinadores</h4>

                    {coordi.map((coordinador, i) => (
                        <CoordinadoresCard
                            key={coordinador.IdEncuesta}
                            modalkey={coordinador.IdEncuesta}
                            coordinador={coordinador}
                            loadCoordinadores={this.loadCoordinadores}
                            coordinadores={this.state.coordinadores}
                            IdEncuesta={this.state.encues}
                        />
                    ))}
                </div>
                
               
                <AddCoordinador
                    loadCoordinadores={this.loadCoordinadores}
                    IdEncuesta={this.state.encues}
                />
                 <MoverCoordinador
                    loadCoordinadores={this.loadCoordinadores}
                    IdEncuesta={this.state.encues}
                />
                 <CoordinadoresSubir
                    loadCoordinadores={this.loadCoordinadores}
                    IdEncuesta={this.state.encues}
                />
            </div>


            //        <AddUser groups={this.state.groups} loadUsers={this.loadUsers} />
        );
    }
}
