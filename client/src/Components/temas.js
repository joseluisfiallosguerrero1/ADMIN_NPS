import React from 'react';
import Modal from 'react-responsive-modal';
//import '../materialize/css/materialize.css';
//import '../materialize/css/style.css';
//import { toast } from 'react-toastify';
//import { AddReportToGroup } from './AddReportToGroup';
//import reportsServices from '../../services/reportsServices';
import advisorServices from '../services/documents.js';

import { TemasLista } from './temasLista.js';

export class TemasGeneral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            che: undefined,
            userStatus: undefined,
            groups: [],
            enablegroup: false,
            link: '',
            Tema: '',
            folder: '',
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

    //   onSaveReport = () => {
    //     if (this.state.link && this.state.technology && this.state.folder) {
    //       reportsServices
    //         .modifyReport(this.props.report.IdReport, {
    //           Technology: this.state.technology,
    //           Link: this.state.link,
    //           Folder: this.state.folder
    //         })
    //         .then(response => {
    //           console.log(response);
    //           if (response.succes == 'true' || response.succes == true) {
    //             toast.success('You just updated this report', {
    //               position: toast.POSITION.BOTTOM_RIGHT,
    //               autoClose: 3000
    //             });
    //             this.props.setTags(this.state.folder);
    //           } else {
    //             toast.error('An error ocurred, we could not save your changes', {
    //               position: toast.POSITION.BOTTOM_RIGHT,
    //               autoClose: 3000
    //             });
    //           }
    //         });
    //     } else {
    //       toast.error('You have an empty field,please checkout the fields', {
    //         position: toast.POSITION.BOTTOM_RIGHT,
    //         autoClose: 3000
    //       });
    //     }
    //   };

    handleOnChangeTema = e => {
        const Tema = e.target.value;
        this.setState(() => ({
            Tema: Tema
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
                open={!!this.props.selectedUser}
                onClose={this.props.hideModal}
                classNames={{ modal: 'modalhans' }}
                center
            >
                <div className="container">
                    <h5 className="center">Temas</h5>
                    <div className="input-field s12">
                        <input
                            name="temasName"
                            placeholder="Nombre del Tema"
                            type="text"
                            onChange={this.handleOnChangeTema}
                        />
                    </div>
                    <button
                            className="waves-effect waves-green btn right"
                        // onClick={this.onSaveReport}
                        >
                            Save
                     </button>

                    {this.props.temas.map((tema, i) => (
                        <TemasLista key={i} tema={tema} />
                    ))}


                    <button
                        onClick={this.props.hideModal}
                        className="waves-effect waves-green btn grey darken-1 right roar2"
                        id="hanc"
                    >
                        Close
          </button>
                </div>
            </Modal>
        );
    }
}