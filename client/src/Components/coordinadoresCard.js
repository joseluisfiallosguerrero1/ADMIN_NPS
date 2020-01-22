import React from 'react';
import { Link } from 'react-router';
//import '../materialize/css/materialize.css';
//import '../materialize/css/style.css';
import advisorServices from '../services/documents.js';
//import { TemasGeneral } from './temas';
//import UsersService from '../../services/usersService';
//import { ToastContainer, toast } from 'react-toastify';

export class CoordinadoresCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: undefined,
      che: false,
      temas: []
    };
  }

  componentDidMount() {
    console.log("imprimir");
    //this.loadTemas();
  }
  showModal = () => {
    this.setState(() => ({
      selectedUser: true
    }));
  };
  hideModal = () => {
    this.setState(() => ({
      selectedUser: false
    }));
  };


  /*deleteUser = () => {
    let no = 2;
    UsersService.deleteUser(this.props.user.IdUser).then(response => {
      if (response.success == 'true') {
        toast.success('The user was successfully deleted', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000
        });
        this.props.loadUsers();
      } else {
        toast.error(response.Msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000
        });
      }
    });
*/
//   loadTemas = () => {
//     console.log(this.props.aspecto);
//     advisorServices.temasPorAspecto(this.props.aspecto.IdAspecto).then(respuesta => {
//       if (respuesta.success) {
//         this.setState(() => ({
//           temas: respuesta.temas
//         }));
//         console.log(this.state.temas);
//       } else {
//         alert("error");
//       }
//     });
//   };

  handleOnChangeActive = e => {
    const ta = e.target;
    /*
        UsersService.modifyUser(this.props.user.IdUser, {
          Active: e.target.checked
        }).then(response => {
          console.log(response);
          if ((response.success = 'true')) {
            toast.success('The user was successfully modify', {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000
            });
            this.props.loadUsers();
          } else {
            toast.error('We could not modified the user', {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 3000
            });
          }
        });
      };
    */
  }
  render() {
    return (
      <div id="han2" className="card">
        <div className="card-content">

          <div className="row " >
            <div className="col s12  " >
              <span className="left">{this.props.coordinador.Nombre}</span>
              <i className="material-icons  right" >delete</i>
              <i onClick={this.showModal} className="material-icons   right" >edit</i>
            </div>

          </div>
        </div>
{/* 
        <TemasGeneral
          key={this.props.modalkey}
          aspecto={this.props.aspecto}
          selectedUser={this.state.selectedUser}
          showModal={this.showModal}
          hideModal={this.hideModal}
          temas={this.state.temas}
        /> */}
      </div >

    );
  }
}
