import React from 'react';
import Modal from 'react-responsive-modal';
//import '../materialize/css/materialize.css';
//import '../materialize/css/style.css';
import { toast } from 'react-toastify';
import cookie from 'react-cookies'
//import { AddReportToGroup } from './AddReportToGroup';
//import reportsServices from '../../services/reportsServices';
import advisorServices from '../services/documents.js';

import { TemasLista } from './temasLista.js';

export class AddAspectoCsv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            che: undefined,
            userStatus: undefined,
            groups: [],
            enablegroup: false,
            link: '',
            Aspecto: '',
            folder: ''
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
    onSaveAspecto = () => {
        console.log("hola")
        var body = {
            aspecto: this.state.Aspecto,
            idEncuesta: (cookie.load('idencuesta')*1)
        };
        console.log(this.state.Coordinador)
        if (this.state.Aspecto) {
            advisorServices
                .agregarAspecto(body)
                .then(response => {

                    if (response.success == 'true' || response.success == true) {
                        // toast.success('You just updated this report', {
                        //     position: toast.POSITION.BOTTOM_RIGHT,
                        //     autoClose: 3000
                        // });
                        this.setState({
                            Aspecto:''
                        });
                        this.props.loadAspectos();
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

    handleOnChangeAspecto = e => {
        const aspec = e.target.value;
        this.setState(() => ({
            Aspecto: aspec
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
                    <h5 className="center">Nuevo Aspecto</h5>
                    <div className="input-field s12">
                        <input
                            name="aspectoName"
                            placeholder="Nombre del Aspecto"
                            type="text"
                            onChange={this.handleOnChangeAspecto}
                            value={this.state.Aspecto}
                        />
                    </div>
                    <button
                            className="waves-effect waves-green btn right"
                         onClick={this.onSaveAspecto}
                        >
                            Save
                     </button>
                </div>
            </Modal>
        );
    }
}