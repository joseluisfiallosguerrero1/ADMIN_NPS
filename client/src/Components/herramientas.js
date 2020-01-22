import React from 'react';
import advisorServices from '../services/documents.js';
import { ModaladdDocument } from './addDocument';
import { ModaladdHerramienta } from './nuevaHerramienta';
import { ModalborrarHerramienta } from './borrarHerramienta';
import { ModalborrarArchivodeHerramienta } from './borrarArchivo';
import { Container, DatePicker } from "react-materialize";
import "react-datepicker/dist/react-datepicker.css";

export class Herramienta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            name: undefined,
            herramientas: [],
            open: false,
            open1: false,
            open2: false,
            open3: false,
            Nombre: undefined,
            archivos: [],
            startDate: new Date(),
            id: undefined
        };
    }
    componentDidMount() {
        var cuerpo = {
            estado: 0
        }

        advisorServices.herramientas(cuerpo).then(response => {
            console.log(response);
            if (response.success) {
                console.log('yeah');
                this.setState({
                    herramientas: response.herramientas
                });
            } else {
            }
        });
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };
    onCloseModal = () => {
        this.setState({ open: false });
    };
    onOpenModal1 = () => {
        this.setState({ open1: true });
    };
    onCloseModal1 = () => {
        this.setState({ open1: false });
    };
    onOpenModal2 = () => {
        this.setState({ open2: true });
    };
    onCloseModal2 = () => {
        this.setState({ open2: false });
    };
    onOpenModal3 = () => {
        this.setState({ open3: true });
    };
    onCloseModal3 = () => {
        this.setState({ open3: false });
    };

    handleOnChangeNombre = e => {
        const nombre = e.target.value;
        console.log(nombre);
        this.setState(() => ({
            Nombre: nombre
        }));
        console.log(this.state.Nombre)
        var cuerpo = {
            Nombre: nombre
        }

        advisorServices.archivosPorHerramientas(cuerpo).then(response => {
            console.log(response);
            if (response.success) {
                console.log('yeah2');
                this.setState({
                    archivos: response.archivos
                });
            } else {
            }
            advisorServices.herramienta(cuerpo).then(response => {
                console.log(response);
                if (response.success) {
                    console.log('yeah2');
                    this.setState({
                        id: response.IdHerramienta
                    });
                } else {
                }

            });
        });
    };
    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {
        const { open } = this.state;
        const { open1 } = this.state;
        const { open2 } = this.state;
        const { open3 } = this.state;
        return (
            <div>

                <div className="row">
                    <div className="col s4 offset-s4">
                        <label>Browser Select</label>
                        <select className="browser-default" onChange={this.handleOnChangeNombre} value={this.state.Nombre} >
                            <option>Elige una Herramienta</option>
                            {this.state.herramientas.map((herramienta, i) => (
                                <option key={i}>{herramienta.Nombre}</option>

                            ))}
                        </select>
                    </div>

                </div>
                <div className="row">
                    <div className="col s12">
                        <a className="waves-effect waves-light btn" ><i className="material-icons right" onClick={this.onOpenModal} >create_new_folder</i>Añadir archivo a Herramienta</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <a className="waves-effect waves-light btn"><i className="material-icons right " onClick={this.onOpenModal3}>create_new_folder</i>Eliminar Archivo de Herramienta</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <a className="waves-effect waves-light btn"><i className="material-icons right" onClick={this.onOpenModal1} >create_new_folder</i>Crear nueva Herramienta</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <a className="waves-effect waves-light btn"><i className="material-icons right" onClick={this.onOpenModal2}>create_new_folder</i>Eliminar Herramienta</a>
                    </div>
                </div>
               
                <ModaladdDocument
                    open={open}
                    onCloseModal={this.onCloseModal}
                    nombre={this.state.Nombre}
                    id={this.state.id}
                />
                <ModaladdHerramienta
                    open1={open1}
                    onCloseModal1={this.onCloseModal1}

                />
                <ModalborrarHerramienta
                    open2={open2}
                    onCloseModal2={this.onCloseModal2}
                    nombre={this.state.Nombre}
                    id={this.state.id}
                />
                <ModalborrarArchivodeHerramienta
                    open3={open3}
                    onCloseModal3={this.onCloseModal3}
                    archivos={this.state.archivos}
                    nombre={this.state.Nombre}
                    id={this.state.id}
                />
            </div>

        );
    }
}