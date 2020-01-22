module.exports = function(sequelize, DataTypes) {
    var AspectosTemasClasificaciones = sequelize.define('AspectosTemasClasificaciones', {
      IdAspectoTema: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      IdComentario: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        foreignkey: true
      },
      IdAspecto: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        foreignkey: true
      },
      IdClasificacion: {
        type: DataTypes.STRING(250),
        allowNull: false,
        foreignkey: true
      },
      IdTema: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        foreignkey: true
      },
     
    },
  {
    schema:'nps',
    timestamps: false,
    underscored: false
  //  underscored: true
    
    
  });
 
// this.associate = (models) => {
   // this.hasMany(groupsusers);
  //}
  
    return AspectosTemasClasificaciones;
  };