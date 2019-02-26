/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    'Card',
    {
      description: { type: DataTypes.STRING },
      dueDate: { type: DataTypes.DATE },
      position: { type: DataTypes.INTEGER },
      text: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    }, {
      freezeTableName: true,
      underscored: true,
      tableName: 'card',
    },
  );

  Card.associate = (models) => {
    models.Card.belongsTo(models.List);
    models.Card.hasMany(models.Label);
  };

  return Card;
};
