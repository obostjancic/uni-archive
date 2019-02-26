/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    'Board',
    {
      name: { type: DataTypes.STRING, allowNull: false, field: 'name' },
      bgColor: { type: DataTypes.STRING, field: 'bg_color' },
      bgImage: { type: DataTypes.STRING, field: 'bg_image' },
      active: {
        type: DataTypes.BOOLEAN, allowNull: false, default: true, field: 'active',
      },
      visibleLabelText: {
        type: DataTypes.BOOLEAN, allowNull: false, default: false, field: 'visible_label_text',
      },
    }, {
      freezeTableName: true,
      underscored: true,
      tableName: 'board',
    },
  );

  Board.associate = (models) => {
    models.Board.belongsTo(models.Team);
  };

  return Board;
};
