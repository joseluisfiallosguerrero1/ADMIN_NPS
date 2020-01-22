module.exports = function(sequelize, DataTypes) {
    var Cola_De_Procesos = sequelize.define('Cola_De_Procesos', {
      IdCola: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      Nombre_De_Archivo: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      IdEncuesta: {
        type: DataTypes.INTEGER(),
        allowNull: false
      },
      Distribucion: {
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
  
    return Cola_De_Procesos;
  };