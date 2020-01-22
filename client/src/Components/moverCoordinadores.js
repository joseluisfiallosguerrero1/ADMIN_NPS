import React from 'react';
//import '../materialize/css/materialize.css';
//import '../materialize/css/style.css';
import { ModalMoverCoordinador } from './modalMoverComentarios';
export class MoverCoordinador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalstate: undefined
    
    };
  }
  showModal = () => {
    this.setState(() => ({
      modalstate: true
    }));
  };
  hideModal = () => {
    this.setState(() => ({
      modalstate: false
    }));
  };
  render() {
    return (
      <div className="fixed-action-btn " id="pure_one2">
        <button
          className="btn-floating btn-large waves-effect waves-light blue"
          onClick={this.showModal}
        >
          <i className="material-icons">supervisor_account</i>
        </button>
        <ModalMoverCoordinador
          showModal={this.showModal}
          hideModal={this.hideModal}
          modalstate={this.state.modalstate}
          IdEncuesta={this.props.IdEncuesta}
        //        groups={this.props.groups}
        //      loadUsers={this.props.loadUsers}
        />
      </div>
    );
  }
}