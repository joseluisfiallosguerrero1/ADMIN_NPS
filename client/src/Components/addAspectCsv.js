import React from 'react';
//import '../materialize/css/materialize.css';
//import '../materialize/css/style.css';
import { ModaladdDocument } from './addDocument';
//import { ModalAddCsv } from './ModalAddCsv';
export class AddAspectCsv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    onOpenModal = () => {
        this.setState({ open: true });
        //   this.props.loadBitacora();
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        return (
            <div className="fixed-action-btn" id="pure_one">
                <button
                    onClick={this.onOpenModal}
                    className="btn-floating btn-large waves-effect waves-light red"
                >
                    <i title="Upload csv" className="material-icons">
                        file_upload
          </i>
                </button>
                <ModaladdDocument
                    open={open}
                    onCloseModal={this.onCloseModal}
                    loadAspectos={this.props.loadAspectos}
                />
            </div>
        );
    }
}