module.exports = function(sequelize, DataTypes) {
    var Temas = sequelize.define('Temas', {
      IdTema: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Tema: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      IdAspecto: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        foreignkey: true,
        
      },
      IdEncuesta: {
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
  
    return Temas;
  };