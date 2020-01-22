module.exports = function (sequelize, DataTypes) {
  var ComentarioPorHerramienta = sequelize.define('ComentarioPorHerramienta', {
    PreClasificacion: {
      type: DataTypes.STRING(250),
      allowNull: false
    },

    Status: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    Comentario: {
      type: DataTypes.TEXT(),
      allowNull: false
    },
    Fecha: {
      type: DataTypes.DATE(),
      allowNull: false
    },
    Estado: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    IdComentario: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    IdHerramienta: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },

    Clasificacion: {
      type: DataTypes.TEXT(),
      allowNull: false
    },

  },
    {
      schema: 'nps',
      timestamps: false,
      //  underscored: true


    });

  // this.associate = (models) => {
  // this.hasMany(groupsusers);
  //}

  return ComentarioPorHerramienta;
};