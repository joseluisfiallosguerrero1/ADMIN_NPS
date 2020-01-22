module.exports = function(sequelize, DataTypes) {
    var Sedes = sequelize.define('Sedes', {
      IdSede: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      IdInstitution: {
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
  
    return Sedes;
  };