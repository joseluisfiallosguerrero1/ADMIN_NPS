module.exports = function(sequelize, DataTypes) {
    var SedesUsuarios = sequelize.define('SedesUsuarios', {
      IdSedeUsuario: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
     
      IdSede: {
        type: DataTypes.INTEGER(),
        allowNull: false
      },
      Nombre: {
        type: DataTypes.STRING(250),
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
  
    return SedesUsuarios;
  };