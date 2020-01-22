import React from 'react';
//import '../materialize/css/materialize.css';
//import '../materialize/css/style.css';
import { AddCoordinadorCsv } from './addCoordinadorCsv';
export class AddCoordinador extends React.Component {
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
        <AddCoordinadorCsv
          showModal={this.showModal}
          hideModal={this.hideModal}
          modalstate={this.state.modalstate}
          loadCoordinadores={this.props.loadCoordinadores}
        //        groups={this.props.groups}
        //      loadUsers={this.props.loadUsers}
        />
      </div>
    );
  }
}