

import React from 'react';
import advisorServices from '../services/documents.js';
//import '../materialize/css/materialize.css';
//import '../materialize/css/style.css';
import { AspectosCard } from './aspectosCard.js';
import { AddAspectCsv } from './addAspectCsv';
import cookie from 'react-cookies'
import { AddAspecto } from './addAspecto';
import './materialize/css/style.css';
//import { AddUser } from './AddUser';
//import { ModalEditUser } from './ModalEditUser';
//import { date } from 'azure-storage';
//import usersService from '../../services/usersService';

export class MenuAspectos extends React.Component {
    state = {
        aspectos: [],
        isMounted: false
    };
    componentDidMount() {
        this.setState({
            isMounted: true
        });
        this.loadAspectos();
        //this.loadGroups();
    }
    componentWillUnmount() {
        this.setState({
            isMounted: false
        });
    }

    loadAspectos = () => {
        advisorServices.aspectosPorEncuesta(cookie.load('idencuesta')).then(response => {
            console.log(response);
            if (response.success) {
                console.log('yeah');
                this.setState({
                    aspectos: response.aspectos
                });
            } else {
            }
        });
    };

    render() {
        let aspec = this.state.aspectos;
        return (
            <div>
                <div className="col s12 m6">
                    <h4>Aspectos</h4>

                    {aspec.map((aspecto, i) => (
                        <AspectosCard
                            key={aspecto.IdEncuesta}
                            modalkey={aspecto.IdEncuesta}
                            aspecto={aspecto}
                            loadAspectos={this.loadAspectos}
                            Aspectos={this.state.Aspectos}
                        />
                    ))}
                </div>
                <AddAspectCsv
                    loadAspectos={this.loadAspectos}
                />
                <AddAspecto
                    loadAspectos={this.loadAspectos} />
            </div>

            //        <AddUser groups={this.state.groups} loadUsers={this.loadUsers} />
        );
    }
}
