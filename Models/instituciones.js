module.exports = function (sequelize, DataTypes) {
    var Instituciones = sequelize.define('Instituciones', {
        IdInstitucion: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: DataTypes.STRING(250),
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

    return Instituciones;
};