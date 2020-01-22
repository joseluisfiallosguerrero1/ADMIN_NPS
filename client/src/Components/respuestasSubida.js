import React from 'react';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies'
import advisorServices from '../services/documents.js';
import Modal from 'react-responsive-modal';

export class RespuestasSubida extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            name: undefined,
            seleccion:0
        };
    }

    onChange = e => {
        let file = e.target.files;
        this.setState({
            name: file[0].name
        });
        let reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = e => {
            this.setState({
                file: e.target.result.split(',')[1]
            });
        };
    };
    handleOnChangeseleccion  = e => {
        const sele = e.target.value;
        // let file = e.target.files;
        // this.setState({
        //     name: file[0].name
        // });
        // let reader = new FileReader();
        // reader.readAsDataURL(file[0]);
        // reader.onload = e => {
        //     this.setState({
        //         file: e.target.result.split(',')[1]
        //     });
        // };
        this.setState({
            seleccion: sele
        });
    };

    onClick = () => {
        if (this.state.name) {

            const csv = this.state;
            let id;
            var bod = {
                idencuesta: (cookie.load('idencuesta')*1),
                name: this.state.name,
                seleccion:this.state.seleccion
            }
            console.log(bod);
            advisorServices.crearCola(bod).then(respi => {
                if (respi.success) {
                    advisorServices.createCsva(csv).then(response => {
                        console.log(response);
                        if (response.success) {
                            alert("Archivo subido, continue con su vida");
                            this.setState({
                                name: ''
                            });

                        } else {
                            alert("error 2");
                        }
                    });
                } else {
                    alert("error al agregar a la cola ");
                }

            })

        } else {
            console.log('holas');
        }


    };


    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.onCloseModal} center>
                <div className="container">
                    <div className="row">
                        <form className="col s12 ">
                            <div className="row">
                                <h5 className="center">UPLOAD File</h5>

                                <h8 className="center">Seleccionando 0 la distribución se hará de manera equitativa de lo contrario se destribuirá segun la sede</h8>
                                <div className="row">
                                    <div className="input-field col s2">
                                        <select
                                            name="idCoordinador1"
                                            className="browser-default"
                                            size="1"
                                            onChange={this.handleOnChangeseleccion}
                                            value={this.state.seleccion}
                                        >   
                                            <option>Elige</option>
                                            <option>0</option>
                                            <option>1</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="file-field input-field ">
                                    <div className="btn ">
                                        <span>Browse</span>

                                    </div>
                                    <div className=" arregloModal">
                                        <input type="file" accept=".csv" onChange={this.onChange} />
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input
                                            className="file-path validate"
                                            type="text"
                                            placeholder="Upload file"
                                            value={this.state.name}
                                        />
                                    </div>
                                    <a className="waves-effect waves-light right">
                                        <i
                                            title="SUBMIT"
                                            className="material-icons teal-text right"
                                            onClick={this.onClick}
                                        >
                                            send
                    </i>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        );
    }
}