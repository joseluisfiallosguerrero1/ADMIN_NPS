module.exports = function(sequelize, DataTypes) {
    var AspectoTemas = sequelize.define('AspectoTemas', {
      Definicion: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      Tema: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      Aspecto: {
        type: DataTypes.STRING(250),
        allowNull: false,
        
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
  
    return AspectoTemas;
  };