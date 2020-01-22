module.exports = function(sequelize, DataTypes) {
    var Aspectos = sequelize.define('Aspectos', {
      IdAspecto: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Aspecto: {
        type: DataTypes.STRING(250),
        allowNull: false
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
  
    return Aspectos;
  };