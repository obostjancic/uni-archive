/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    'List',
    {
      name: { type: DataTypes.STRING, allowNull: false, field: 'name' },
      position: { type: DataTypes.INTEGER, field: 'position' },
    }, {
      freezeTableName: true,
      underscored: true,
      tableName: 'list',
    },
  );

  List.associate = (models) => {
    models.List.belongsTo(models.Board);
  };

  return List;
};
