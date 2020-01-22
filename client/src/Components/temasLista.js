import React from 'react';

// import '../materialize/css/materialize.css';
// import '../materialize/css/style.css';

export class TemasLista extends React.Component {
  constructor(props) {
    super(props);
  }

 

  render() {
    return (
      <div className="chip">
        {this.props.tema.Tema}
        <i className="close material-icons" >
          arrow_upward
        </i>
      </div>
    );
  }
}