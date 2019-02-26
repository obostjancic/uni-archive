/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const ChecklistItem = sequelize.define(
    'ChecklistItem',
    {
      text: { type: DataTypes.STRING, allowNull: false, field: 'text' },
      completed: {
        type: DataTypes.BOOLEAN, default: false, allowNull: false, field: 'completed',
      },
      position: { type: DataTypes.INTEGER, field: 'position' },
    }, {
      freezeTableName: true,
      underscored: true,
      tableName: 'checklist_item',
    },
  );

  ChecklistItem.associate = (models) => {
    models.ChecklistItem.belongsTo(models.Checklist);
  };
  return ChecklistItem;
};
