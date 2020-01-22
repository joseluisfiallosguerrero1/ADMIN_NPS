import React from 'react';
//import '../materialize/css/materialize.css';
//import '../materialize/css/style.css';
import { ModaladdHerramienta } from './nuevaHerramienta';
export class IconoAddEncuesta extends React.Component {
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
      <div className="fixed-action-btn">
        <button
          className="btn-floating btn-large waves-effect waves-light blue"
          onClick={this.showModal}
        >
          <i className="material-icons">add</i>
        </button>
        <ModaladdHerramienta
          showModal={this.showModal}
          hideModal={this.hideModal}
          modalstate={this.state.modalstate}
        //        groups={this.props.groups}
        //      loadUsers={this.props.loadUsers}
        />
      </div>
    );
  }
}