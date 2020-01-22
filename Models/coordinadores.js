module.exports = function(sequelize, DataTypes) {
    var Coordinadoresns = sequelize.define('Coordinadoresns', {
      IdCoordinador: {
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
      Nombre: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      KeyNumber: {
        type: DataTypes.INTEGER(),
        allowNull: false
      },
      Campus: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      usuariomd: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      passmd: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      Distribuido: {
        type: DataTypes.INTEGER(),
        allowNull: true
      },
      IdEncuesta: {
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
  
    return Coordinadoresns;
  };