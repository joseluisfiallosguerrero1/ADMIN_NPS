module.exports = function(sequelize, DataTypes) {
    var Encuestas = sequelize.define('Encuestas', {
      IdEncuesta: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Fecha: {
        type: DataTypes.DATE(),
        allowNull: true
      },
      Nombre: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      Descripcion: {
        type: DataTypes.STRING(250),
        allowNull: false
      },    
      Estado: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      IdInstitucion: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        foreignkey: true
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
  
    return Encuestas;
  };