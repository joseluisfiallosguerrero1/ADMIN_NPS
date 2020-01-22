import React from 'react';
import { Redirect } from 'react-router-dom';
import advisorServices from '../services/documents.js';
import './materialize/css/materialize.css';
import './materialize/css/style.css';
import Modal from 'react-responsive-modal';


export class ModalborrarHerramienta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            name: undefined
        };
    }



    render() {
        return (
            <Modal open={this.props.open2} onClose={this.props.onCloseModal2} center >
                <div className="container" >
                    <h5 className="tituloModal1">Está seguro que desea borrar este elemento?</h5>

                    <div>
                        <div className="row boton2">
                            <div className="col s12">
                                <a className="waves-effect waves-light btn"><i className="material-icons right"></i>Sí, estoy seguro</a>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
        );
    }
}