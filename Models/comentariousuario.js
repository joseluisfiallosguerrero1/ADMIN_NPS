module.exports = function(sequelize, DataTypes) {
    var ComentariosUsuarios = sequelize.define('ComentariosUsuarios', {
      IdComentarioUsuario: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
     
      IdComentario: {
        type: DataTypes.INTEGER(),
        allowNull: false
      },
      IdUsuario: {
        type: DataTypes.INTEGER(),
        allowNull: false
      }
      
    },
  {
    schema:'nps',
    timestamps: false,
  //  underscored: true
    
    
  });
 
// this.associate = (models) => {
   // this.hasMany(groupsusers);
  //}
  
    return ComentariosUsuarios;
  };