module.exports = function(sequelize, DataTypes) {
    var Clasificaciones = sequelize.define('Clasificaciones', {
      IdClasificacion: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Clasificacion: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      IdHerramienta: {
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
  
    return Clasificaciones;
  };