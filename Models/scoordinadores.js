module.exports = function(sequelize, DataTypes) {
    var Coordinadores = sequelize.define('Coordinadores', {
      COORDINADOR: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      CARGO: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      CAMPUS: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      MODALIDAD: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      FECHA_MODIFICACION: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      FECHA_CREACION: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      NOMBRE_DE_ARCHIVO_ORIGEN: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      USUARIO_QUE_CARGA: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      FECHA_DE_CARGA: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      PROCESADO: {
        type: DataTypes.INTEGER(),
        allowNull: false
      },
      AUX1: {
        type: DataTypes.INTEGER(),
        allowNull: false
      },
      IdEncuesta: {
        type: DataTypes.INTEGER(),
        allowNull: false
      },
    },
  {
    schema:'source',
    timestamps: false,
  //  underscored: true
    
    
  });
 
// this.associate = (models) => {
   // this.hasMany(groupsusers);
  //}
  
    return Coordinadores;
  };