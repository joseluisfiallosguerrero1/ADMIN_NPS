import React from 'react';
import { Redirect } from 'react-router-dom';
import advisorServices from '../services/documents.js';
import './materialize/css/materialize.css';
import './materialize/css/style.css';
import Modal from 'react-responsive-modal';


export class ModalborrarArchivodeHerramienta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            name: undefined,
            archivos: []
        };
    }


    render() {
        return (
            <Modal className="modalhans7" open={this.props.open3} onClose={this.props.onCloseModal3} center >
                <div className="container cubo2" >
                    <table className="responsive-table tabl">
                        <thead>
                            <tr>
                                <th data-field="Nombre">Nombre</th>
                                <th data-field="Fecha">Fecha</th>
                                <th data-field="Eliminar">Eliminar</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.props.archivos.map((archivo, i) => (

                                <tr>
                                    <td>{archivo.Nombre}</td>
                                    <td>{archivo.Fecha}</td>
                                    <td><i className="material-icons center hmc">delete</i></td>


                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </Modal>
        );
    }
}