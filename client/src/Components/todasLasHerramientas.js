import React from 'react';
import { Link } from 'react-router';
import { NavLink } from 'react-router-dom';
//import '../materialize/css/materialize.css';
//import '../materialize/css/style.css';
import cookie from 'react-cookies'
import advisorServices from '../services/documents.js';
import { RespuestasSubida } from './respuestasSubida.js';
//import UsersService from '../../services/usersService';
//import { ToastContainer, toast } from 'react-toastify';

export class TodasLasHerramientas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: undefined,
      che: false,
      open: false
      
    };
  }

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
*/  onOpenModal = () => {
  cookie.save('idencuesta', this.props.Encuesta.IdEncuesta, { path: '/' });    
    this.setState({ open: true });
    //   this.props.loadBitacora();
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
 
  sCookies = () => {
    cookie.save('idencuesta', this.props.Encuesta.IdEncuesta, { path: '/' });    
   
  };

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
      <div id="han" className="card">
        <div className="card-content">

          <div className="row " >
            <div className="col s12  " >
              <span className="left">{this.props.Encuesta.Nombre}</span>
              <a className="waves-effect waves-light btn arreglobtn right"><i className="material-icons right" >delete</i>Eliminar Herramienta</a>
              <NavLink
                to={{
                  pathname: "/menuDeCoordinadores",
                  state: {
                    IdEncuesta: this.props.Encuesta.IdEncuesta
                  }
                }} ><a onClick={this.sCookies} className="waves-effect waves-light btn arreglobtn right" ><i className="material-icons right" >group_add</i>Coordinadores</a></NavLink>



              <a onClick={this.onOpenModal} className="waves-effect waves-light btn arreglobtn right"><i className="material-icons right " >insert_comment</i>Subir Respuestas</a>


              <NavLink to="/menuDeAspectos"> <a onClick={this.sCookies} className="waves-effect waves-light btn arreglobtn right"><i className="material-icons right"  >create_new_folder</i>Aspectos y Temas  </a></NavLink>




            </div>

          </div>
        </div>

        {/* <ModalEditUser
          key={this.props.modalkey}
          user={this.props.user}
          selectedUser={this.state.selectedUser}
          showModal={this.showModal}
          hideModal={this.hideModal}
          groups={this.props.groups}
          loadUsers={this.props.loadUsers}
        /> */}
        <RespuestasSubida
          open={this.state.open}
          onCloseModal={this.onCloseModal}

        />
      </div >

    );
  }
}
