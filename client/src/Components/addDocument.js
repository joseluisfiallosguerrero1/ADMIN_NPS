import React from 'react';
import { Redirect } from 'react-router-dom';
import advisorServices from '../services/documents.js';
import Modal from 'react-responsive-modal';
import cookie from 'react-cookies'
export class ModaladdDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            name: undefined
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

    onClick = () => {
        if (this.state.name) {

            const csv = this.state;
            let id;
            advisorServices.createCsva(csv).then(response => {
                console.log(response);
                if (response.success) {
                    alert("Archivo subido, continue con su vida");

                    let bod = {
                        name: this.state.name,
                        idencuesta: (cookie.load('idencuesta')*1)
                    }
                    advisorServices.LlenadoDeAspectoTema(bod).then(resp => {
                        if (resp.success) {
                            alert("Se lleno Source");
                            let bod2 = {
                                idencuesta: (cookie.load('idencuesta')*1)
                            }
                            advisorServices.DistribucionAspectosTemas(bod2).then(respi => {
                                console.log(respi);
                                if (respi.succes) {
                                    alert("Se Distribuyeron aspectos");
                                    advisorServices.DistribuciondeTemas(bod2).then(respira => {
                                        if (respira.succes) {
                                            alert("Se Distribuyeron los temas");
                                            this.setState({
                                                name: ''
                                            });
                                            this.props.loadAspectos();
                                        }else{
                                            alert("falló al final");
                                        }
                                    });
                                } else {
                                    alert("error en DistribucionAspectosTemas");
                                }
                            });

                        } else {
                            alert("error");
                        }
                    });
                } else {
                }
            });
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