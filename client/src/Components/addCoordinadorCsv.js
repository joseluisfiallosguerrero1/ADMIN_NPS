import React from 'react';
import Modal from 'react-responsive-modal';
//import '../materialize/css/materialize.css';
//import '../materialize/css/style.css';
import cookie from 'react-cookies'
import { toast } from 'react-toastify';
//import { AddReportToGroup } from './AddReportToGroup';
import advisorServices from '../services/documents.js';

import { TemasLista } from './temasLista.js';

export class AddCoordinadorCsv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            che: undefined,
            userStatus: undefined,
            groups: [],
            enablegroup: false,
            link: '',
            Aspecto: '',
            folder: '',
            Coordinador: '',
            Cargo: '',
            Campus: ''
            // temas:[]
        };
    }

    componentDidMount() {
        console.log("imprimir");
        // this.loadTemas();
    }
    //   loadTemas = () => {
    //       console.log(this.props.aspecto);
    //     advisorServices.temasPorAspecto(this.props.aspecto.IdAspecto).then(respuesta => {
    //       if (respuesta.success) {
    //         this.setState(() => ({
    //           temas: respuesta.temas
    //         }));
    //       } else {
    //         alert("error");
    //       }
    //     });
    //   };

    handleOnChangeGroup = e => {
        // const ta = e.target;
        // console.log(ta.checked);
        // this.setState(() => ({
        //   che: ta.checked
        // }));
    };

    onSaveCoordinador = () => {
        console.log("hola")
        var body = {
            coordinador: this.state.Coordinador,
            cargo: this.state.Cargo,
            campus: this.state.Campus,
            Distribuido:1,
            idencuesta: (cookie.load('idencuesta')*1)
        };
        console.log(this.state.Coordinador)
        if (this.state.Coordinador && this.state.Cargo && this.state.Campus) {
            advisorServices
                .agregarCoordinador(body)
                .then(response => {

                    if (response.success == 'true' || response.success == true) {
                        // toast.success('You just updated this report', {
                        //     position: toast.POSITION.BOTTOM_RIGHT,
                        //     autoClose: 3000
                        // });
                        this.setState({
                            Coordinador: '',
                            Cargo:'',
                            Campus:''

                        });
                        this.props.loadCoordinadores();
                        console.log(response);

                    } else {
                        toast.error('An error ocurred, we could not save your changes', {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 3000
                        });
                    }
                });
        } else {
            toast.error('You have an empty field,please checkout the fields', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000
            });
            console.log("hola")
        }
    };

    handleOnChangeCoordinador = e => {
        const coordi = e.target.value;
        console.log(e.target.value);
        console.log(coordi);
        this.setState(() => ({
            Coordinador: coordi
        }));
    };
    handleOnChangeCargo = e => {
        const car = e.target.value;
        this.setState(() => ({
            Cargo: car
        }));
    };
    handleOnChangeCampus = e => {
        const cam = e.target.value;
        this.setState(() => ({
            Campus: cam
        }));
    };
    //   handleOnChangeLink = e => {
    //     const link = e.target.value;
    //     this.setState(() => ({
    //       link: link
    //     }));
    //   };

    //   handleOnChangeFolder = e => {
    //     const folder = e.target.value;
    //     this.setState(() => ({
    //       folder: folder
    //     }));
    //   };

    //   folderCh = folderName => {
    //     this.setState(() => ({
    //       folder: folderName
    //     }));
    //   };
    render() {
        return (
            <Modal
                open={!!this.props.modalstate}
                onClose={this.props.hideModal}
                classNames={{ modal: 'modalhans' }}
                center
            >
                <div className="container">
                    <h5 className="center">Nuevo Coordinador</h5>
                    <div className="input-field s12">
                        <input
                            name="CoordinadorN"
                            placeholder="Nombre del Coordinador"
                            type="text"
                            onChange={this.handleOnChangeCoordinador}
                            value={this.state.Coordinador}
                        />
                    </div>
                    <div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input
                                    name="Cargo"
                                    placeholder="Cargo  del Coordinador"
                                    type="text"
                                    onChange={this.handleOnChangeCargo}
                                    value={this.state.Cargo}
                                />
                            </div>
                            <div className="input-field  col s6 ">
                                <input
                                    name="Campus"
                                    placeholder="Campus"
                                    type="text"
                                    onChange={this.handleOnChangeCampus}
                                    value={this.state.Campus}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        className="waves-effect waves-green btn right "
                        onClick={this.onSaveCoordinador}
                    >
                        Save
                     </button>
                    {/* <button
                        onClick={this.props.hideModal}
                        className="waves-effect waves-green btn grey darken-1 right "

                    >
                        Close
          </button> */}
                </div>
            </Modal>
        );
    }
}