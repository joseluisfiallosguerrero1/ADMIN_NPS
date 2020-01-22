import React from 'react';
import Modal from 'react-responsive-modal';
//import '../materialize/css/materialize.css';
//import '../materialize/css/style.css';
import { toast } from 'react-toastify';
import cookie from 'react-cookies'
//import { AddReportToGroup } from './AddReportToGroup';
import advisorServices from '../services/documents.js';

import { TemasLista } from './temasLista.js';

export class ModalMoverCoordinador extends React.Component {
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
            Coordinador1: '',
            Total: 0,
            Coordinador2: '',
            coordinadores: [],
            idCoordinador1: 0,
            idCoordinador2: 0
            // temas:[]
        };
    }

    componentDidMount() {
        console.log("imprimir "     +       (cookie.load('idencuesta')*1));
        this.loadCoordinadores();
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
    loadCoordinadores = () => {
        advisorServices.coordinadoresPorEncuesta(2).then(response => {
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

    handleOnChangeGroup = e => {
        // const ta = e.target;
        // console.log(ta.checked);
        // this.setState(() => ({
        //   che: ta.checked
        // }));
    };

    moverComentario = () => {
        console.log("hola")

        var body = {
            idCoordinador1: this.state.idCoordinador1*1,
            idCoordinador2: this.state.idCoordinador2*1,
            total: this.state.Total*1,
            idencuesta: (cookie.load('idencuesta')*1)
        };
        console.log(body);
        if (this.state.Coordinador1 && this.state.Coordinador2 && this.state.Total) {
            advisorServices
                .moverComentario(body)
                .then(response => {

                    if (response.success == 'true' || response.success == true) {
                        // toast.success('You just updated this report', {
                        //     position: toast.POSITION.BOTTOM_RIGHT,
                        //     autoClose: 3000
                        // });
                        // this.setState({
                        //     Coordinador1: '',
                        //     Cargo: '',
                        //     Campus: ''

                        // });

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

    handleOnChangeCoordinador1 = e => {
        const coordi = e.target.value;
        console.log(e.target.value);
        
        const arr=(coordi.split(","));
        //console.log(arr[arr.length-1]);
        this.setState({
            idCoordinador1:((arr[arr.length-1]))
        });
        
        console.log(this.state.idCoordinador1);
        this.setState(() => ({
            Coordinador1: coordi
        }));
    };
    handleOnChangeTotal = e => {
        const tot = e.target.value;
        this.setState(() => ({
            Total: tot
        }));
    };
    handleOnChangeCoordinador2 = e => {
        const coordi = e.target.value;
        console.log(e.target.value);
        console.log(coordi);
        const arr=(coordi.split(","));
        //console.log(arr[arr.length-1]);
        this.setState({
            idCoordinador2:((arr[arr.length-1]))
        });
        console.log(this.state.idCoordinador1);
        console.log(this.state.idCoordinador2);
        this.setState(() => ({
            Coordinador2: coordi
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
                    <h5 className="center"> Mover Respuestas</h5>
                    <h7 className="center"> Seleccione o escriba la cantidad de Comentarios que desea mover de un usuario a otro</h7>
                    <div className="row">
                        <div className="input-field col s2  offset-s5">
                            <input
                                name="CoordinadorN"
                                placeholder="total a mover"
                                type="number"
                                onChange={this.handleOnChangeTotal}
                                value={this.state.Total}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="row">
                            <div className="input-field col s6">
                                <select
                                    name="idCoordinador1"
                                    className="browser-default"
                                    size="1"
                                    onChange={this.handleOnChangeCoordinador1}
                                    value={this.state.Coordinador1}
                                >
                                    {this.state.coordinadores.map((coordi, i) => (
                                        <option key={i}>{coordi.Nombre},{coordi.IdCoordinador}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-field col s6">
                                <select
                                    name="idCoordinador2"
                                    className="browser-default"
                                    size="1"
                                    onChange={this.handleOnChangeCoordinador2}
                                    value={this.state.Coordinador2}
                                >
                                    {this.state.coordinadores.map((coordi, i) => (
                                        <option key={i}>{coordi.Nombre},{coordi.IdCoordinador}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button
                        className="waves-effect waves-green btn right "
                        onClick={this.moverComentario}
                    >
                        Move
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