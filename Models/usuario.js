module.exports = function(sequelize, DataTypes) {
    var Usuarios = sequelize.define('Usuarios', {
      IdUsuario: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Rol: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      Contraseña: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      Usuario: {
        type: DataTypes.STRING(250),
        allowNull: false
      },

      
    },
  {
    schema:'nps',
    timestamps: false,
  //  underscored: true
    
    
  });
 
// this.associate = (models) => {
   // this.hasMany(groupsusers);
  //}
  
    return Usuarios;
  };