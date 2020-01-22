module.exports = function(sequelize, DataTypes) {
    var Comentarios = sequelize.define('Comentarios', {
      IdComentario: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      PreClasificacion: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      Clasificacion: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      Status: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      Comentario: {
        type: DataTypes.TEXT(),
        allowNull: false
      },
      NombreDeArchivo: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      Fecha: {
        type: DataTypes.DATE(),
        allowNull: false
      },
      FechaModificacion: {
        type: DataTypes.DATE(),
        allowNull: true
      },
      Estado: {
        type: DataTypes.INTEGER(),
        allowNull: false
      },
      IdHerramienta: {
        type: DataTypes.INTEGER(),
        allowNull: false
      },
      IdUsuario: {
        type: DataTypes.INTEGER(),
        allowNull: false
      },
      Aspecto: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      Tema: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      
    },
  {
    schema:'nps',
    timestamps: false,
    underscored: false
  //  underscored: true
    
    
  });
 
// this.associate = (models) => {
   // this.hasMany(groupsusers);
  //}
  
    return Comentarios;
  };