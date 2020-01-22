module.exports = function(sequelize, DataTypes) {
    var Archivos = sequelize.define('Archivos', {
      IdArchivo: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Fecha: {
        type: DataTypes.DATE(),
        allowNull: false
      },
      Nombre: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      Estado: {
        type: DataTypes.INTEGER(),
        allowNull: false
      },
      IdHerramienta: {
        type: DataTypes.INTEGER(),
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
  
    return Archivos;
  };