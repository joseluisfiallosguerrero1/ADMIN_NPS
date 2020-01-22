

import React from 'react';
import advisorServices from '../services/documents.js';
//import '../materialize/css/materialize.css';
//import '../materialize/css/style.css';
import { TodasLasHerramientas } from './todasLasHerramientas';
import './materialize/css/style.css';

import { IconoAddEncuesta } from './iconoAddEncuesta';
//import { ModalEditUser } from './ModalEditUser';
//import { date } from 'azure-storage';
//import usersService from '../../services/usersService';


export class MenuDeHerramientas extends React.Component {
    state = {
        users: [],
        search: '',
        groups: [],
        herramientas: [],
        isMounted: false
    };
    componentDidMount() {
        this.setState({
            isMounted: true
        });
        this.loadEncuestas();
        //this.loadGroups();
    }
    componentWillUnmount() {
        this.setState({
            isMounted: false
        });
    }

    loadEncuestas = () => {
        advisorServices.herramientas().then(response => {
            console.log(response);
            if (response.success) {
                console.log('yeah');
                this.setState({
                    herramientas: response.encuestas
                });
            } else {
            }
        });
    };

    render() {
        let encues = this.state.herramientas;
        return (
            <div>
                <div className="col s12 m6">
                    <h4>Encuestas</h4>

                    {encues.map((Encuesta, i) => (
                        <TodasLasHerramientas
                            key={Encuesta.IdEncuesta}
                            modalkey={Encuesta.IdEncuesta}
                            Encuesta={Encuesta}
                            loadEncuestas={this.loadEncuestas}
                            Encuestas={this.state.Encuestas}
                        />
                    ))}
                </div>
                <IconoAddEncuesta
                    loadEncuestas={this.loadEncuestas}
                />
            </div>

            //        <AddUser groups={this.state.groups} loadUsers={this.loadUsers} />
        );
    }
}
