/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const Checklist = sequelize.define(
    'Checklist',
    {
      header: { type: DataTypes.STRING, allowNull: false, field: 'header' },
    }, {
      freezeTableName: true,
      underscored: true,
      tableName: 'checklist',
    },
  );

  Checklist.associate = (models) => {
    models.Checklist.belongsTo(models.Card);
  };
  return Checklist;
};
