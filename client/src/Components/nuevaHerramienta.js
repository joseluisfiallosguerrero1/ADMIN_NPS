import React from 'react';
import { Redirect } from 'react-router-dom';
import advisorServices from '../services/documents.js';
import './materialize/css/materialize.css';
import $ from 'jquery';
import { toast } from 'react-toastify';
import './materialize/css/style.css';
import DatePicker from "react-datepicker";
import M from "materialize-css";
//import { Container, DatePicker } from "react-materialize";
import Modal from 'react-responsive-modal';
import "react-datepicker/dist/react-datepicker.css";


export class ModaladdHerramienta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            name: undefined,
            instituciones: [],
            Nombre: '',
            institucion: '',
            idInstitucion: 0,
            Descripcion: '',
            startDate: new Date()

        };
    }

    componentDidMount() {
        /*
        M.AutoInit();
        document.addEventListener('DOMContentLoaded', function () {
            var options = {
                defaultDate: new Date(2018, 1, 3),
                setDefaultDate: true
            };
            var elem = document.querySelector('.datepicker');      
            var instance = M.Datepicker.init(elem, options);
           
        });
        */
        this.loadInstituciones();
    }
    loadInstituciones = () => {
        advisorServices.getInstituciones().then(response => {
            console.log(response);
            if (response.succes) {
                console.log('yeah');
                console.log(response)
                this.setState({
                    instituciones: response.data
                });
            } else {
            }
        });
    };
    handleOnChangeinstitucion = e => {
        const insti = e.target.value;
        console.log(e.target.value);
        console.log(insti);
        const arr = (insti.split(","));
        //console.log(arr[arr.length-1]);
        this.setState({
            idInstitucion: ((arr[arr.length - 1]))
        });
        this.setState(() => ({
            institucion: insti
        }));
    };
    handleOnChangeNombre = e => {
        const nom = e.target.value;
        console.log(e.target.value);
        console.log(nom);
        this.setState(() => ({
            Nombre: nom
        }));
    };
    handleOnChangeDescripcion = e => {
        const des = e.target.value;
        console.log(e.target.value);
        console.log(des);
        this.setState(() => ({
            Descripcion: des
        }));
    };
    salvarHerramienta = () => {
        console.log("hola")

        var body = {
            Nombre: this.state.Nombre,
            IdInstitucion: this.state.idInstitucion * 1,
            Descripcion: this.state.Descripcion,

        };
        console.log(body);
        if (this.state.Nombre && this.state.idInstitucion && this.state.Descripcion) {
            console.log("ddddddddddddddddddddd");
            advisorServices
                .nuevaHerramienta(body)
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
                        this.setState(() => ({
                            Descripcion: '',
                            Nombre:''
                        }));
                        console.log(response);

                    } else {
                        toast.error('An error ocurred, we could not save your changes', {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 3000
                        });
                        console.log("nada dog");
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

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {
        return (
            <Modal open={!!this.props.modalstate}
                onClose={this.props.hideModal}
                classNames={{ modal: 'modalhans' }}
                center >
                <div className="container" >
                    <h4 className="tituloModal">Nueva Herramienta</h4>
                    <div className="row">
                            <div className="row prueba">
                                <div className="input-field col s6"  >
                                    <input placeholder="Nommbre" id="first_name" type="text"  value={this.state.Nombre} onChange={this.handleOnChangeNombre}></input>
                                    <label for="first_name">Nombre</label>
                                </div>
                            </div>
                            <div className="row prueba2 ">
                                <div className="input-field col s12">
                                    <input id="descripcion" type="text"  value={this.state.Descripcion} onChange={this.handleOnChangeDescripcion}></input>
                                    <label for="Descripcion">Descripción</label>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="input-field col s5">
                                    <select
                                        name="Instituciones"
                                        className="browser-default"
                                        size="1"
                                        onChange={this.handleOnChangeinstitucion}
                                        value={this.state.institucion}
                                    >
                                        <option>Elige</option>
                                        {this.state.instituciones.map((insti, i) => (
                                            <option key={i}>{insti.Nombre} , {insti.IdInstitucion}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                      
                    </div>
                    <div>
                        <button
                            className="waves-effect waves-green btn right "
                            onClick={this.salvarHerramienta}
                        >
                            Move
                     </button>
                    </div>

                </div>
            </Modal>
        );
    }
}